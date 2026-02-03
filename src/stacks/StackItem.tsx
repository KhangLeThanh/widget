import type { Stack } from "../features/wishlist/wishlistSlice";
import { useAppDispatch } from "../hooks/redux";
import { cardMoved } from "../features/wishlist/wishlistSlice";

interface Props {
  stack: Stack;
  active: boolean;
  count: number;
  onClick: () => void;
  onDelete: () => void;
}

export function StackItem({ stack, active, count, onClick, onDelete }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const cardId = e.dataTransfer.getData("cardId");
        if (!cardId) return;

        dispatch(
          cardMoved({
            cardId,
            targetStackId: stack.id,
          })
        );
      }}
      style={{ position: "relative" }}
    >
      <button
        onClick={onClick}
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          border: active ? "2px solid #2563eb" : "1px solid #d1d5db",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong style={{ fontSize: 12 }}>{stack.name}</strong>
        <span style={{ fontSize: 11, color: "#6b7280" }}>{count} items</span>
      </button>

      <button
        onClick={onDelete}
        title="Delete stack"
        style={{
          position: "absolute",
          top: -6,
          right: -6,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
