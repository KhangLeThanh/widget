import { useAppSelector } from "../hooks/redux";
import { CardItem } from "./CardItem";

export function CardList() {
  const { cards, activeStackId } = useAppSelector((s) => s.wishlist);

  if (!activeStackId) {
    return (
      <div style={{ padding: 12, color: "#6b7280" }}>No stack selected</div>
    );
  }

  const visibleCards = cards.filter((card) => card.stackId === activeStackId);

  if (visibleCards.length === 0) {
    return (
      <div style={{ padding: 12, color: "#6b7280" }}>This stack is empty</div>
    );
  }

  return (
    <div>
      {visibleCards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
