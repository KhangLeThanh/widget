import TinderCard from "react-tinder-card";
import { useAppSelector } from "../hooks/redux";
import { CardItem } from "./CardItem";

export function SwipeCardStack() {
  const { cards, activeStackId } = useAppSelector((s) => s.wishlist);

  if (!activeStackId) return null;

  const stackCards = cards.filter((c) => c.stackId === activeStackId);

  if (stackCards.length === 0) {
    return <div>No cards</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        height: 360,
      }}
    >
      {stackCards.map((card) => (
        <TinderCard key={card.id} preventSwipe={["up", "down"]}>
          <div
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <CardItem card={card} />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
