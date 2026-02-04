import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CreateModalType } from "../../enum";

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
  showCreateStack: boolean;
  showCreateCard: boolean;
}
interface SetCreateModalPayload {
  type: CreateModalType;
  open: boolean;
}

const randomCover = () =>
  `linear-gradient(135deg,
    hsl(${Math.random() * 360}, 70%, 60%),
    hsl(${Math.random() * 360}, 70%, 50%)
  )`;

const initialState: WishlistState = {
  stacks: [],
  cards: [],
  activeStackId: null,
  dockExpanded: true,
  swipeMode: false,
  showCreateStack: false,
  showCreateCard: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
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
      prepare(
        stackId: string,
        title: string,
        cover: string,
        description?: string
      ) {
        return {
          payload: {
            id: nanoid(),
            stackId,
            title,
            cover,
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
    cardRemoved(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },
    dockToggled(state) {
      state.dockExpanded = !state.dockExpanded;
    },

    toggleSwipeMode(state) {
      state.swipeMode = !state.swipeMode;
    },

    setCreateModal(state, action: PayloadAction<SetCreateModalPayload>) {
      const { type, open } = action.payload;
      if (type === CreateModalType.STACK) state.showCreateStack = open;
      if (type === CreateModalType.CARD) state.showCreateCard = open;
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
  setCreateModal,
  cardRemoved,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
