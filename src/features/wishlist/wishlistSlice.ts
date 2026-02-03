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
  dockOpen: boolean;
  filterText: string;
  isCreatingStack: boolean;
  dockExpanded: boolean;
  swipeMode: boolean;
  showCreateStack: boolean;
}

const initialState: WishlistState = {
  stacks: [],
  cards: [],
  activeStackId: null,
  dockOpen: true,
  filterText: "",
  isCreatingStack: false,
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
        return { payload: { id: nanoid(), name } };
      },
      reducer(state, action: PayloadAction<Stack>) {
        state.stacks.push(action.payload);
        if (!state.activeStackId) {
          state.activeStackId = action.payload.id;
        }
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

    dockToggled(state) {
      state.dockExpanded = !state.dockExpanded;
    },

    filterChanged(state, action: PayloadAction<string>) {
      state.filterText = action.payload;
    },

    openCreateStack(state) {
      state.showCreateStack = true;
    },

    closeCreateStack(state) {
      state.showCreateStack = false;
    },
    toggleSwipeMode(state) {
      state.swipeMode = !state.swipeMode;
    },
    cardMoved(
      state,
      action: PayloadAction<{ cardId: string; stackId: string }>
    ) {
      const card = state.cards.find((c) => c.id === action.payload.cardId);
      if (card) {
        card.stackId = action.payload.stackId;
      }
    },
  },
});

export const {
  stackAdded,
  stackSelected,
  cardAdded,
  dockToggled,
  filterChanged,
  openCreateStack,
  closeCreateStack,
  toggleSwipeMode,
  cardMoved,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
