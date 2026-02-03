import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { dockToggled } from "../features/wishlist/wishlistSlice";
import { StackList } from "../stacks/StackList";
import { AddCardForm } from "../cards/AddCardForm";
import { CardList } from "../cards/CardList";
import { SwipeToggle } from "../cards/SwipeToggle";
import { CreateStackForm } from "../stacks/CreateStackForm";

export function WishlistDock() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.wishlist.dockExpanded);
  const showCreateStack = useAppSelector((s) => s.wishlist.showCreateStack);
  return (
    <div
      style={{
        width: expanded ? 320 : 180,
        height: expanded ? 480 : 180,
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        transition: "all 0.25s ease",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <strong>Wishlist</strong>
        <button onClick={() => dispatch(dockToggled())}>
          {expanded ? "–" : "+"}
        </button>
      </div>

      {expanded && (
        <div style={{ padding: 12 }}>
          {showCreateStack && <CreateStackForm />}
          <StackList />
          <SwipeToggle />
          <AddCardForm />
          <CardList />
        </div>
      )}
    </div>
  );
}
