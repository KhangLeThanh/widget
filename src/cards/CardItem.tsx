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
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.currentTarget.style.opacity = "0.7";
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onDragStart={(e) => {
          e.dataTransfer.setData("cardId", card.id);
          e.dataTransfer.effectAllowed = "move";
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
        style={{
          padding: 12,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "grab",
          backgroundImage: `url(${card.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "rgb(71 71 71 / 30%) 0px 0px 0px 2000px inset",
        }}
      >
        <strong style={{ fontSize: 14, color: "#fff" }}>{card.title}</strong>
        {card.description && (
          <p style={{ fontSize: 12, color: "#fff" }}>{card.description}</p>
        )}
      </div>
      {isDragging && <DeleteDropZone />}
    </>
  );
}
