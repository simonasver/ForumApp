import { fileInstance } from "./api";

export const getImage = async (id: string, signal?: AbortSignal) => {
  const res = await fileInstance.get(`/image/${id}`, {
    responseType: "arraybuffer",
    signal: signal,
  });
  return res.data;
};
