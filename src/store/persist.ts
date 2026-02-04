import type { WishlistState } from "../features/wishlist/wishlistSlice";
import { initialState } from "../features/wishlist/wishlistSlice";

const KEY = "wishlist_state";

// Always returns a valid WishlistState
export function loadWishlistState(): WishlistState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState; // fallback if nothing stored
    return JSON.parse(raw) as WishlistState;
  } catch {
    return initialState; // fallback on parse errors
  }
}

export function saveWishlistState(state: WishlistState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore errors
  }
}
