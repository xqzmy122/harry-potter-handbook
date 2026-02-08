import { ICard, Potion, Spell } from "@/types/types";

export const mapSpellToCard = (spell: Spell): ICard => ({
  title: spell.attributes?.name || "Something",
  id: spell.id,
  subtitle: spell.attributes.incantation || "Something will be here",
  image: spell.attributes.image ?? null,
  type: spell.type,
});

export const mapPotionToCard = (potion: Potion): ICard => ({
  id: potion.id,
  title: potion.attributes?.name || "Something",
  subtitle: potion.attributes.difficulty || "Something will be here",
  image: potion.attributes.image ?? null,
  type: potion.type,
});
