import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { loadWishlistState, saveWishlistState } from "./persist";

const preloadedState = {
  wishlist: loadWishlistState(),
};

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveWishlistState(store.getState().wishlist);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
