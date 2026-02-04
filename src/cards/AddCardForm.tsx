import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { cardAdded, setCreateModal } from "../features/wishlist/wishlistSlice";
import { CreateModalType } from "../enum";

export function AddCardForm() {
  const dispatch = useAppDispatch();
  const { activeStackId, stacks } = useAppSelector((s) => s.wishlist);

  const [selectedStackId, setSelectedStackId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");

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
    setSelectedStackId(null);
    dispatch(setCreateModal({ type: CreateModalType.CARD, open: false }));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md mb-3 bg-white shadow-sm"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        placeholder="Cover image URL (required)"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={selectedStackId ?? activeStackId ?? ""}
        onChange={(e) => setSelectedStackId(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {stacks.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(
              setCreateModal({ type: CreateModalType.CARD, open: false })
            )
          }
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
