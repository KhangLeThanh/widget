import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Stack {
  id: string;
  name: string;
}

export interface Card {
  id: string;
  stackId: string;
  title: string;
  description?: string;
}

export interface WishlistState {
  stacks: Stack[];
  cards: Card[];
  activeStackId: string | null;
  dockExpanded: boolean;
  swipeMode: boolean;
  showCreateStack: boolean;
}

const initialState: WishlistState = {
  stacks: [],
  cards: [],
  activeStackId: null,
  dockExpanded: true,
  swipeMode: false,
  showCreateStack: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    stackAdded: {
      prepare(name: string) {
        return {
          payload: {
            id: nanoid(),
            name,
          },
        };
      },
      reducer(state, action: PayloadAction<Stack>) {
        state.stacks.push(action.payload);
        state.activeStackId = action.payload.id;
        state.showCreateStack = false;
      },
    },

    stackSelected(state, action: PayloadAction<string>) {
      state.activeStackId = action.payload;
    },
    stackDeleted(state, action: PayloadAction<string>) {
      const stackId = action.payload;

      state.stacks = state.stacks.filter((s) => s.id !== stackId);

      state.cards = state.cards.filter((c) => c.stackId !== stackId);

      if (state.activeStackId === stackId) {
        state.activeStackId =
          state.stacks.length > 0 ? state.stacks[0].id : null;
      }
    },
    cardAdded: {
      prepare(stackId: string, title: string, description?: string) {
        return {
          payload: {
            id: nanoid(),
            stackId,
            title,
            description,
          },
        };
      },
      reducer(state, action: PayloadAction<Card>) {
        state.cards.push(action.payload);
      },
    },

    cardMoved(
      state,
      action: PayloadAction<{
        cardId: string;
        targetStackId: string;
      }>
    ) {
      const { cardId, targetStackId } = action.payload;

      const card = state.cards.find((c) => c.id === cardId);
      if (card) {
        card.stackId = targetStackId;
      }
    },

    dockToggled(state) {
      state.dockExpanded = !state.dockExpanded;
    },

    toggleSwipeMode(state) {
      state.swipeMode = !state.swipeMode;
    },

    openCreateStack(state) {
      state.showCreateStack = true;
    },

    closeCreateStack(state) {
      state.showCreateStack = false;
    },
  },
});

export const {
  stackAdded,
  stackDeleted,
  stackSelected,
  cardAdded,
  cardMoved,
  dockToggled,
  toggleSwipeMode,
  openCreateStack,
  closeCreateStack,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
