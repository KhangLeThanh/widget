import { useState } from "react";
import type { Card } from "../features/wishlist/wishlistSlice";
import { DeleteDropZone } from "./DeleteDropZone";

interface Props {
  card: Card;
}
export function CardItem({ card }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.currentTarget.classList.add("opacity-70")}
        onDragLeave={(e) => e.currentTarget.classList.remove("opacity-70")}
        onDragStart={(e) => {
          e.dataTransfer.setData("cardId", card.id);
          e.dataTransfer.effectAllowed = "move";
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
        className="relative p-3 rounded-lg border border-gray-300 cursor-grab shadow-inner transition-transform duration-150 ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: `url(${card.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <strong className="text-white text-sm">{card.title}</strong>
        {card.description && (
          <p className="text-white text-xs">{card.description}</p>
        )}
      </div>

      {isDragging && <DeleteDropZone />}
    </>
  );
}
