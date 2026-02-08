import { ApiResponse } from "./types";
import { api } from "./api";
import { Spell } from "@/types/types";

export const getAllSpells = async (): Promise<Spell[]> => {
  const res = await api.get<ApiResponse<Spell[]>>("/v1/spells");
  return res.data.data;
};

export const getSpellsByPage = async (page: number, search?: string): Promise<Spell[]> => {
  const res = await api.get<ApiResponse<Spell[]>>(`/v1/spells`, {
    params: {
      "page[number]": page,
      "page[size]": 10,
      ...(search && { "filter[incantation_cont]": search }),
    },
  });
  return res.data.data;
};
