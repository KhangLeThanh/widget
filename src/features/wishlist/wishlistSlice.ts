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

interface WishlistState {
  stacks: Stack[];
  cards: Card[];
  activeStackId: string | null;
  dockOpen: boolean;
  filterText: string;
  isCreatingStack: boolean;
}

const initialState: WishlistState = {
  stacks: [],
  cards: [],
  activeStackId: null,
  dockOpen: true,
  filterText: "",
  isCreatingStack: false,
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
      state.dockOpen = !state.dockOpen;
    },

    filterChanged(state, action: PayloadAction<string>) {
      state.filterText = action.payload;
    },

    openCreateStack(state) {
      state.isCreatingStack = true;
    },

    closeCreateStack(state) {
      state.isCreatingStack = false;
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
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
