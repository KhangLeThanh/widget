import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { cardMoved } from "../features/wishlist/wishlistSlice";
import type { Card } from "../features/wishlist/wishlistSlice";

interface Props {
  card: Card;
}

export function CardItem({ card }: Props) {
  const dispatch = useAppDispatch();
  const stacks = useAppSelector((s) => s.wishlist.stacks);
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        background: "#fff",
      }}
    >
      <div
        style={{
          height: 120,
          borderRadius: 6,
          background: "#e5e7eb",
          marginBottom: 8,
        }}
      />

      <div style={{ fontWeight: 600 }}>{card.title}</div>

      {card.description && (
        <div style={{ fontSize: 14, color: "#6b7280" }}>{card.description}</div>
      )}
      <select
        value={card.stackId}
        onChange={(e) =>
          dispatch(
            cardMoved({
              cardId: card.id,
              stackId: e.target.value,
            })
          )
        }
      >
        {stacks.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
