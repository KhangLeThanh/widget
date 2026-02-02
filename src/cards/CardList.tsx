import { useAppSelector } from "../hooks/redux";

export function CardList() {
  const { cards, activeStackId } = useAppSelector((s) => s.wishlist);

  const visible = cards.filter((c) => c.stackId === activeStackId);

  if (!activeStackId) return null;

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {visible.map((card) => (
        <div
          key={card.id}
          style={{
            width: 180,
            padding: 12,
            borderRadius: 12,
            background: "#f3f4f6",
          }}
        >
          <strong>{card.title}</strong>
          <p style={{ fontSize: 12 }}>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
