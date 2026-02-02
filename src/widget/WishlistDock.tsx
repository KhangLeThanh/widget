import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  dockToggled,
  filterChanged,
  openCreateStack,
} from "../features/wishlist/wishlistSlice";

import { StackList } from "../stacks/StackList";
import { CreateStackForm } from "../stacks/CreateStackForm";
import { CardList } from "../cards/CardList";
import { AddCardForm } from "../cards/AddCardForm";

export function WishlistDock() {
  const dispatch = useAppDispatch();

  const dockOpen = useAppSelector((s) => s.wishlist.dockOpen);
  const filterText = useAppSelector((s) => s.wishlist.filterText);
  const isCreatingStack = useAppSelector((s) => s.wishlist.isCreatingStack);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: 720,
        maxWidth: "95vw",
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        padding: 12,
        fontFamily: "system-ui, sans-serif",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <button onClick={() => dispatch(dockToggled())}>
          {dockOpen ? "Minimize" : "Expand"}
        </button>

        <input
          value={filterText}
          onChange={(e) => dispatch(filterChanged(e.target.value))}
          placeholder="Filter stacks"
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
          }}
        />

        <button onClick={() => dispatch(openCreateStack())}>+ Stack</button>
      </div>

      {dockOpen && (
        <>
          {isCreatingStack && <CreateStackForm />}

          <StackList />
          <AddCardForm />

          <CardList />
        </>
      )}
    </div>
  );
}
