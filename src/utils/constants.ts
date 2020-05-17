type Type = "agent" | "anchor" | "aspect" | "conflict" | "engine";

type TypeOption = { label: string; value: Type };

export const typeOptions: TypeOption[] = [
  { label: "Agent", value: "agent" },
  { label: "Engine", value: "engine" },
  { label: "Anchor", value: "anchor" },
  { label: "Conflict", value: "conflict" },
  { label: "Aspect", value: "aspect" },
];

export const twoSectionCards = ["conflict", "engine"];

export const defaultCards = [
  {
    type: "agent",
    bottom: "A STORYTELLER",
    top: "A WRITER",
    left: "A GAME MASTER",
    right: "A TEACHER",
  },
  {
    type: "engine",
    bottom: "WANTS TO design",
    top: "wants to create",
    left: "",
    right: "",
  },
  {
    type: "anchor",
    bottom: "A CUSTOM CARD",
    top: "A CREATIVE\nPROMPT",
    left: "A PLOT",
    right: "A STORY IDEA",
  },
  {
    type: "conflict",
    bottom: "BUT FIRST THEY MUST LEARN HOW TO EDIT CARDS",
    top: "BUT THEY WILL HAVE TO PRACTICE IMPORTING AND EXPORTING DECKS",
    left: "",
    right: "",
  },
  {
    type: "aspect",
    bottom: "IMAGINATIVE",
    top: "THOUGHT-PROVOKING",
    left: "NEW",
    right: "ORIGINAL",
  },
];

export const emptyCard = {
  top: "",
  bottom: "",
  left: "",
  right: "",
  type: "agent",
};

export type Quality = "original" | "light" | "minimalist";

export const defaultOptions = {
  displayBacks: false,
  frontQuality: "original" as Quality,
  backQuality: "original" as Quality,
};

type QualityOption = { label: string; value: Quality };

export const backQualityOptions: QualityOption[] = [
  { label: "Original", value: "original" },
  { label: "Minimalist", value: "minimalist" },
];

export const frontQualityOptions: QualityOption[] = [
  { label: "Original", value: "original" },
  { label: "Light", value: "light" },
  { label: "Minimalist", value: "minimalist" },
];

export const maxZoom = 1.25;
