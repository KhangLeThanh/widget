import type { WishlistState } from "../features/wishlist/wishlistSlice";

const KEY = "wishlist_state";

export function loadWishlistState(): WishlistState | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function saveWishlistState(state: WishlistState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore write errors
  }
}
