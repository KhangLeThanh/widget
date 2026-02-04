import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CreateModalType } from "../../utils/enum";

export interface Stack {
  id: string;
  name: string;
  cover?: string;
}

export interface Card {
  id: string;
  stackId: string;
  title: string;
  description?: string;
  cover: string;
}

export interface WishlistState {
  stacks: Stack[];
  cards: Card[];
  activeStackId: string | null;
  dockExpanded: boolean;
  swipeMode: boolean;
  createModal: {
    type: CreateModalType;
    open: boolean;
  };
}

const randomCover = () =>
  `linear-gradient(135deg,
    hsl(${Math.random() * 360}, 70%, 60%),
    hsl(${Math.random() * 360}, 70%, 50%)
  )`;

export const initialState: WishlistState = {
  stacks: [],
  cards: [],
  activeStackId: null,
  dockExpanded: true,
  swipeMode: false,
  createModal: { type: CreateModalType.NONE, open: false },
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add a new stack
    stackAdded: {
      prepare(name: string, cover?: string) {
        return {
          payload: {
            id: nanoid(),
            name,
            cover: cover ?? randomCover(),
          },
        };
      },
      reducer(state, action: PayloadAction<Stack>) {
        state.stacks.push(action.payload);
        state.activeStackId = action.payload.id;
        state.createModal = { type: CreateModalType.NONE, open: false };
      },
    },

    // Select a stack
    stackSelected(state, action: PayloadAction<string>) {
      state.activeStackId = action.payload;
    },

    // Delete a stack and its cards
    stackDeleted(state, action: PayloadAction<string>) {
      const stackId = action.payload;
      state.stacks = state.stacks.filter((s) => s.id !== stackId);
      state.cards = state.cards.filter((c) => c.stackId !== stackId);

      if (state.activeStackId === stackId) {
        state.activeStackId =
          state.stacks.length > 0 ? state.stacks[0].id : null;
      }
    },

    // Add a card
    cardAdded: {
      prepare(
        stackId: string,
        title: string,
        cover: string,
        description?: string
      ) {
        return {
          payload: { id: nanoid(), stackId, title, cover, description },
        };
      },
      reducer(state, action: PayloadAction<Card>) {
        state.cards.push(action.payload);
      },
    },

    // Move a card between stacks
    cardMoved(
      state,
      action: PayloadAction<{ cardId: string; targetStackId: string }>
    ) {
      const { cardId, targetStackId } = action.payload;
      const card = state.cards.find((c) => c.id === cardId);
      if (card) card.stackId = targetStackId;
    },

    // Remove a card
    cardRemoved(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },

    // Toggle dock
    dockToggled(state) {
      state.dockExpanded = !state.dockExpanded;
    },

    // Toggle swipe mode
    toggleSwipeMode(state) {
      state.swipeMode = !state.swipeMode;
    },

    // Open/close any create modal
    setCreateModal(
      state,
      action: PayloadAction<{ type: CreateModalType; open: boolean }>
    ) {
      state.createModal = action.payload;
    },
  },
});

export const {
  stackAdded,
  stackDeleted,
  stackSelected,
  cardAdded,
  cardMoved,
  cardRemoved,
  dockToggled,
  toggleSwipeMode,
  setCreateModal,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
