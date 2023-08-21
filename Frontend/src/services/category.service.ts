import { Category, PaginatedResponse } from "../utils/types";
import api from "./api";

export const getCategories = async (
  page: number,
  size: number,
  signal?: AbortSignal
): Promise<PaginatedResponse<Category>> => {
  const res = await api.get(
    `/category/?page=${page}&size=${size}&sortField=orderIndex&sortOrder=ASC`,
    {
      signal: signal,
    }
  );
  return res.data;
};

export const addCategory = async (title: string): Promise<string> => {
  const res = await api.post("/category/", {
    title: title,
  });
  return res.data;
};

export const reorderCategories = async (numbers: {
  [id: string]: number;
}): Promise<void> => {
  const res = await api.put("/category/order", {
    updatedNumbers: numbers,
  });
  return res.data;
};
