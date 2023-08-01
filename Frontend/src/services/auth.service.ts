import { AppDispatch } from "../store";
import { authActions } from "../store/auth-slice";
import { Token } from "../utils/types";
import api from "./api";

export const login = async (
  username: string,
  password: string
): Promise<Token> => {
  const res = await api.post("/token/", {
    username: username,
    password: password,
  });
  return res.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<Token> => {
  const res = await api.post("/user/", {
    username: username,
    email: email,
    password: password,
  });
  return res.data;
};

export const refresh = async (token: string): Promise<Token> => {
  const res = await api.put("/token/", {
    token,
  });
  return res.data;
};

export const logout = async (dispatch: AppDispatch, signal?: AbortSignal) => {
  try {
    const res = await api.delete("/token/", { signal: signal });
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    dispatch(authActions.clearUser());
  }
};
