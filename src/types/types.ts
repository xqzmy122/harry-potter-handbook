export interface ICard {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  type: "spell" | "potion";
}

export interface ICardProp {
  data: ICard;
}

export interface Spell {
  id: string;
  type: "spell";
  attributes: {
    slug: string | null;
    category: string | null;
    creator: string | null;
    effect: string | null;
    hand: string | null;
    image: string | null;
    incantation: string | null;
    light: string | null;
    name: string | null;
    wiki: string | null;
  };
  links: {
    self: string | null;
  };
}

export interface Potion {
  id: string;
  type: "potion";
  attributes: {
    slug: string | null;
    characteristics: string | null;
    difficulty: string | null;
    effect: string | null;
    image: string | null;
    inventors: string | null;
    ingredients: string | null;
    manufacturers: string | null;
    name: string | null;
    side_effects: string | null;
    time: string | null;
    wiki: string | null;
  };
  links: {
    self: string | null;
  };
}
