import { useAppSelector } from "../hooks/redux";
import { CardItem } from "./CardItem";
import { SwipeCardStack } from "./SwipeCardStack";

export function CardList() {
  const { cards, activeStackId, swipeMode } = useAppSelector((s) => s.wishlist);

  if (!activeStackId) return null;

  const visibleCards = cards.filter((card) => card.stackId === activeStackId);

  if (visibleCards.length === 0) {
    return <div className="text-gray-500 text-sm">This stack is empty</div>;
  }

  return swipeMode ? (
    <SwipeCardStack />
  ) : (
    <div className="flex flex-col gap-3">
      {visibleCards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
