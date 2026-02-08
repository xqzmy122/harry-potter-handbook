import { getSpellById } from "@services/api/spells.service";
import { getPotionById } from "@services/api/potions.service";
import { Spell, Potion } from "@/types/types";

export type DetailDisplayData = {
  name: string;
  image: string | null;
  fields: { label: string; value: string | null }[];
};

export type DetailType = "spell" | "potion";

type DetailConfig<T> = {
  fetch: (id: string) => Promise<T | null>;
  mapToDisplay: (data: T) => DetailDisplayData;
};

export const detailConfigs: Record<DetailType, DetailConfig<Spell | Potion>> = {
  spell: {
    fetch: getSpellById,
    mapToDisplay: data => {
      const a = (data as Spell).attributes;
      return {
        name: a.name ?? "Unknown",
        image: a.image,
        fields: [
          { label: "Incantation", value: a.incantation },
          { label: "Category", value: a.category },
          { label: "Effect", value: a.effect },
          { label: "Creator", value: a.creator },
          { label: "Light", value: a.light },
          { label: "Hand", value: a.hand },
        ],
      };
    },
  },
  potion: {
    fetch: getPotionById,
    mapToDisplay: data => {
      const a = (data as Potion).attributes;
      return {
        name: a.name ?? "Unknown",
        image: a.image,
        fields: [
          { label: "Category", value: a.category },
          { label: "Difficulty", value: a.difficulty },
          { label: "Effect", value: a.effect },
          { label: "Time", value: a.time },
          { label: "Ingredients", value: a.ingredients },
          { label: "Side effects", value: a.side_effects },
          { label: "Inventors", value: a.inventors },
          { label: "Characteristics", value: a.characteristics },
        ],
      };
    },
  },
};
