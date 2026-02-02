import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { cardAdded } from "../features/wishlist/wishlistSlice";

export function AddCardForm() {
  const dispatch = useAppDispatch();
  const activeStackId = useAppSelector((s) => s.wishlist.activeStackId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!activeStackId) return null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!activeStackId) return;
    if (!title.trim()) return;

    dispatch(
      cardAdded(activeStackId, title.trim(), description.trim() || undefined)
    );

    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
        style={{
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
        }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        style={{
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
        }}
      />

      <button type="submit">Add card</button>
    </form>
  );
}
