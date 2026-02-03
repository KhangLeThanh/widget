import { useAppSelector } from "../hooks/redux";
import { CardItem } from "./CardItem";
import { SwipeCardStack } from "./SwipeCardStack";

export function CardList() {
  const { cards, activeStackId, swipeMode } = useAppSelector((s) => s.wishlist);

  if (!activeStackId) return null;

  const visibleCards = cards.filter((card) => card.stackId === activeStackId);

  if (visibleCards.length === 0) {
    return <div>This stack is empty</div>;
  }

  if (swipeMode) {
    return <SwipeCardStack />;
  }

  return (
    <div>
      {visibleCards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
