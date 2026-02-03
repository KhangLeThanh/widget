import type { Card } from "../features/wishlist/wishlistSlice";

interface Props {
  card: Card;
}

export function CardItem({ card }: Props) {
  return (
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
      }}
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        background: "#fff",
        cursor: "grab",
      }}
    >
      <strong>{card.title}</strong>
      {card.description && (
        <p style={{ fontSize: 12, color: "#6b7280" }}>{card.description}</p>
      )}
    </div>
  );
}
