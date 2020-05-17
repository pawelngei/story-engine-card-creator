import { CardType } from "../Card/Card";
import { twoSectionCards } from "./constants";

const swap180 = (card: CardType) => {
  const previousTop = card.top;
  return {
    ...card,
    top: card.bottom,
    bottom: previousTop,
    left: "",
    right: "",
  };
};

export const rotateLeft = (card: CardType) => {
  if (twoSectionCards.indexOf(card.type) !== -1) {
    return swap180(card);
  }
  const previousTop = card.top;
  return {
    ...card,
    top: card.right || "",
    right: card.bottom || "",
    bottom: card.left || "",
    left: previousTop || "",
  };
};

export const rotateRight = (card: CardType) => {
  if (twoSectionCards.indexOf(card.type) !== -1) {
    return swap180(card);
  }
  const previousTop = card.top;
  return {
    ...card,
    top: card.left || "",
    right: previousTop || "",
    bottom: card.right || "",
    left: card.bottom || "",
  };
};
