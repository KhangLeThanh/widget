import type { Stack } from "../features/wishlist/wishlistSlice";
import { useAppDispatch } from "../hooks/redux";
import { cardMoved } from "../features/wishlist/wishlistSlice";
import { useState } from "react";

interface Props {
  stack: Stack;
  active: boolean;
  count: number;
  onClick: () => void;
  onDelete: () => void;
}

export function StackItem({ stack, active, count, onClick, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);

        const cardId = e.dataTransfer.getData("cardId");
        if (!cardId) return;

        dispatch(
          cardMoved({
            cardId,
            targetStackId: stack.id,
          })
        );
      }}
      style={{
        position: "relative",
        transition: "transform 0.15s ease, opacity 0.15s ease",
        opacity: isDragOver ? 0.7 : 1,
        transform: isDragOver ? "scale(1.05)" : "scale(1)",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          border: active ? "2px solid #2563eb" : "1px solid #d1d5db",
          background: stack.cover ?? "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: stack.cover ? "#fff" : "#111827",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "rgb(71 71 71 / 30%) 0px 0px 0px 2000px inset",
          backgroundImage: stack.cover ? `url(${stack.cover})` : "none",
          textShadow: stack.cover ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <strong style={{ fontSize: 12 }}>{stack.name}</strong>
        <span style={{ fontSize: 11 }}>{count} items</span>
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
