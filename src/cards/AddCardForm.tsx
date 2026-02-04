import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { cardAdded } from "../features/wishlist/wishlistSlice";

export function AddCardForm() {
  const dispatch = useAppDispatch();
  const { activeStackId, stacks } = useAppSelector((s) => s.wishlist);

  const [selectedStackId, setSelectedStackId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");

  if (!activeStackId || stacks.length === 0) return null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const stackIdToUse = selectedStackId ?? activeStackId;

    if (!title.trim() || !cover.trim() || !stackIdToUse) return;

    dispatch(
      cardAdded(
        stackIdToUse,
        title.trim(),
        cover.trim(),
        description.trim() || undefined
      )
    );

    setTitle("");
    setDescription("");
    setCover("");
    setSelectedStackId(null); // reset selection
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
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
      />

      <input
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        placeholder="Cover image URL (required)"
        required
      />

      <select
        value={selectedStackId ?? activeStackId}
        onChange={(e) => setSelectedStackId(e.target.value)}
        required
      >
        {stacks.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button type="submit">Add card</button>
    </form>
  );
}
