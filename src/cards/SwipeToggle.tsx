import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleSwipeMode } from "../features/wishlist/wishlistSlice";

export function SwipeToggle() {
  const dispatch = useAppDispatch();
  const swipeMode = useAppSelector((s) => s.wishlist.swipeMode);

  return (
    <button
      onClick={() => dispatch(toggleSwipeMode())}
      style={{ marginBottom: 8 }}
    >
      {swipeMode ? "List view" : "Swipe view"}
    </button>
  );
}
