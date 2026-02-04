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
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);

        const cardId = e.dataTransfer.getData("cardId");
        if (!cardId) return;

        dispatch(cardMoved({ cardId, targetStackId: stack.id }));
      }}
      className={`relative transition-transform duration-150 ease-in-out ${
        isDragOver ? "opacity-70 scale-105" : "opacity-100 scale-100"
      }`}
    >
      <button
        onClick={onClick}
        className={`w-18 h-18 p-2 rounded-xl flex flex-col justify-center items-center shadow-inner transition-colors duration-150
          ${active ? "border-2 border-blue-600" : "border"}
        `}
        style={{
          background: stack.cover ?? "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: stack.cover ? `url(${stack.cover})` : "none",
          color: stack.cover ? "#fff" : "#111827",
          textShadow: stack.cover ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <strong className="text-xs">{stack.name}</strong>
        <span className="text-[11px]">{count} items</span>
      </button>

      <button
        onClick={onDelete}
        title="Delete stack"
        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}
