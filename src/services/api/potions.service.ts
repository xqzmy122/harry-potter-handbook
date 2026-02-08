import { ApiResponse } from "./types";
import { api } from "./api";
import { Potion } from "@/types/types";

export const getAllPotions = async (): Promise<Potion[]> => {
  const res = await api.get<ApiResponse<Potion[]>>("/v1/potions");
  return res.data.data;
};

export const getPotionsByPage = async (page: number, search?: string): Promise<Potion[]> => {
  const res = await api.get<ApiResponse<Potion[]>>(`/v1/potions`, {
    params: {
      "page[number]": page,
      "page[size]": 10,
      ...(search && { "filter[name_cont]": search }),
    },
  });
  return res.data.data;
};

export const getPotionById = async (id: string): Promise<Potion | null> => {
  try {
    const res = await api.get<ApiResponse<Potion>>(`/v1/potions/${id}`);
    return res.data.data;
  } catch {
    return null;
  }
};
