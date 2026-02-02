import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { dockToggled, filterChanged } from "../features/wishlist/wishlistSlice";

export function DockHeader() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.wishlist.dockOpen);
  const filter = useAppSelector((s) => s.wishlist.filterText);

  return (
    <div className="flex items-center gap-2 mb-2">
      <button onClick={() => dispatch(dockToggled())}>
        {expanded ? "Minimize" : "Expand"}
      </button>

      <input
        placeholder="Filter stacks"
        value={filter}
        onChange={(e) => dispatch(filterChanged(e.target.value))}
        className="border px-2 py-1 rounded flex-1"
      />

      <button className="px-2">+</button>
    </div>
  );
}
