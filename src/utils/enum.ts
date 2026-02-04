export const CreateModalType = {
  STACK: "stack",
  CARD: "card",
  NONE: "none",
} as const;

export type CreateModalType =
  (typeof CreateModalType)[keyof typeof CreateModalType];
