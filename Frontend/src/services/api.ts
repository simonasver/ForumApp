import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { authActions } from "../store/auth-slice";
import { Token } from "../utils/types";

let store: Store<RootState>;

export const injectStore = (storeToInject: Store<RootState>) => {
  store = storeToInject;
};

const apiUrl = "http://localhost:8080/api";

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const fileInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.tokens?.accessToken || undefined;
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fileInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.tokens?.accessToken || undefined;
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.headers.pagination) {
      const pagination = JSON.parse(res.headers.pagination);
      if (pagination) {
        res.data = { data: res.data, pagination };
      }
    }
    return res;
  },
  async (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

    const originalConfig = err.config;
    if (
      !(originalConfig.url === "/token/" && originalConfig.method === "put") &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const tokens = store.getState().auth.tokens as Token;
          const res = await instance.put("/token/", {
            refreshToken: tokens.refreshToken,
          });

          store.dispatch(authActions.changeTokens(res.data));
          return instance(originalConfig);
        } catch (_error) {
          store.dispatch(authActions.clearUser());
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

fileInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

    const originalConfig = err.config;
    if (
      !(originalConfig.url === "/token/" && originalConfig.method === "put") &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const tokens = store.getState().auth.tokens as Token;
          const res = await instance.put("/token/", {
            refreshToken: tokens.refreshToken,
          });

          store.dispatch(authActions.changeTokens(res.data));
          return instance(originalConfig);
        } catch (_error) {
          store.dispatch(authActions.clearUser());
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export { fileInstance };
export default instance;
