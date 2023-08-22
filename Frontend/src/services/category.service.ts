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

export const renameCategory = async (categoryId: string, newTitle: string) => {
  const res = await api.put(`/category/${categoryId}/title`, {
    newTitle: newTitle,
  });
  return res.data;
};

export const deleteCategory = async (categoryId: string) => {
  const res = await api.delete(`/category/${categoryId}`);
  return res.data;
};
