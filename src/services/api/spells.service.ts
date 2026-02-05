import { ApiResponse } from "./types";
import { api } from "./api";
import { Spell } from "@/types/types";

export const getAllSpells = async (): Promise<Spell[]> => {
  const res = await api.get<ApiResponse<Spell[]>>("https://api.potterdb.com/v1/spells");
  return res.data.data;
};
