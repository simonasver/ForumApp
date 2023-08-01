import { User } from "../utils/types";
import api, { fileInstance } from "./api";

export const getProfile = async (signal?: AbortSignal): Promise<User> => {
  const res = await api.get("/user/profile", { signal: signal });
  return res.data;
};

export const confirmEmail = async (emailCode: string): Promise<void> => {
  const res = await api.put("/user/emailConfirmationCode", {
    emailCode: emailCode,
  });
  return res.data;
};

export const resendEmail = async (email: string): Promise<void> => {
  const res = await api.put("/user/email", { email: email });
  return res.data;
};

export const uploadProfilePicture = async (picture: File): Promise<string> => {
  const res = await fileInstance.put("/user/profilepicture", {
    file: picture,
  });
  return res.data;
};
