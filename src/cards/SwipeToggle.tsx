import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleSwipeMode } from "../features/wishlist/wishlistSlice";

export function SwipeToggle() {
  const dispatch = useAppDispatch();
  const swipeMode = useAppSelector((s) => s.wishlist.swipeMode);

  return (
    <button
      onClick={() => dispatch(toggleSwipeMode())}
      className="mb-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {swipeMode ? "List view" : "Swipe view"}
    </button>
  );
}
