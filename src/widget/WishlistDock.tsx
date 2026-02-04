import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  dockToggled,
  setCreateModal,
} from "../features/wishlist/wishlistSlice";
import { StackList } from "../stacks/StackList";
import { CreateStackForm } from "../stacks/CreateStackForm";
import { AddCardForm } from "../cards/AddCardForm";
import { CardList } from "../cards/CardList";
import { SwipeToggle } from "../cards/SwipeToggle";
import { CreateModalType } from "../enum";

export function WishlistDock() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((s) => s.wishlist.dockExpanded);
  const { activeStackId, stacks, showCreateStack } = useAppSelector(
    (s) => s.wishlist
  );

  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const handleCreateClick = () => {
    setShowCreateMenu((prev) => !prev);
  };

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
      <div
        style={{
          height: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 12px",
          position: "relative",
        }}
      >
        <strong>Wishlist</strong>
        <button onClick={() => dispatch(dockToggled())}>
          {expanded ? "–" : "+"}
        </button>
      </div>

      <div style={{ position: "relative", padding: "12px" }}>
        <button
          onClick={handleCreateClick}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid #ddd",
            background: "#f9f9f9",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          +
        </button>

        {showCreateMenu && (
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "20%",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "8px 0",
              width: 120,
            }}
          >
            <div
              onClick={() => {
                if (!activeStackId || stacks.length === 0) return;
                dispatch(
                  setCreateModal({ type: CreateModalType.CARD, open: true })
                );
                setShowCreateMenu(false);
              }}
              style={{
                padding: "8px 12px",
                cursor:
                  !activeStackId || stacks.length === 0
                    ? "not-allowed"
                    : "pointer",
                opacity: !activeStackId || stacks.length === 0 ? 0.5 : 1,
                borderBottom: "1px solid #eee",
                userSelect: "none",
              }}
            >
              Card
            </div>
            <div
              onClick={() => {
                dispatch(
                  setCreateModal({ type: CreateModalType.STACK, open: true })
                );
                setShowCreateMenu(false);
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Stack
            </div>
          </div>
        )}
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
