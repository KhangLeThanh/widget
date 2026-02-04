import TinderCard from "react-tinder-card";
import { useAppSelector } from "../hooks/redux";
import { CardItem } from "./CardItem";

export function SwipeCardStack() {
  const { cards, activeStackId } = useAppSelector((s) => s.wishlist);

  if (!activeStackId) return null;

  const stackCards = cards.filter((c) => c.stackId === activeStackId);

  if (stackCards.length === 0) {
    return <div className="text-gray-500 text-sm">No cards</div>;
  }

  return (
    <div className="relative h-96">
      {stackCards.map((card) => (
        <TinderCard key={card.id} preventSwipe={["up", "down"]}>
          <div className="absolute w-full">
            <CardItem card={card} />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
