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
      action: PayloadAction<{ cardId: string; stackId: string }>
    ) {
      const card = state.cards.find((c) => c.id === action.payload.cardId);
      if (card) card.stackId = action.payload.stackId;
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
  stackSelected,
  cardAdded,
  cardMoved,
  dockToggled,
  toggleSwipeMode,
  openCreateStack,
  closeCreateStack,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
