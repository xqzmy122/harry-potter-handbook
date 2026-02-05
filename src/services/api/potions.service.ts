import { ApiResponse } from "./types";
import { api } from "./api";
import { Potion } from "@/types/types";

export const getAllPotions = async (): Promise<Potion[]> => {
  const res = await api.get<ApiResponse<Potion[]>>("https://api.potterdb.com/v1/potions");
  return res.data.data;
};
