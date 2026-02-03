import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { dockToggled } from "../features/wishlist/wishlistSlice";
import { StackList } from "../stacks/StackList";
import { CreateStackForm } from "../stacks/CreateStackForm";
import { AddCardForm } from "../cards/AddCardForm";
import { CardList } from "../cards/CardList";
import { SwipeToggle } from "../cards/SwipeToggle";

export function WishlistDock() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.wishlist.dockExpanded);
  const showCreateStack = useAppSelector((s) => s.wishlist.showCreateStack);

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        width: expanded ? 320 : 180,
        height: expanded ? 480 : 180,
        transition: "all 0.25s ease",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 12px",
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
