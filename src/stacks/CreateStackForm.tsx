import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { stackAdded, setCreateModal } from "../features/wishlist/wishlistSlice";
import { CreateModalType } from "../utils/enum";

export function CreateStackForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [cover, setCover] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(stackAdded(name.trim(), cover || undefined));
    setName("");
    setCover("");
  }

  return (
    <form
      onSubmit={submit}
      className="p-4 border border-gray-300 rounded-md mb-3 bg-white shadow-sm"
    >
      <h4 className="text-lg font-semibold mb-3">Create Stack</h4>

      <input
        placeholder="Stack name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        placeholder="Cover image URL (optional)"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(
              setCreateModal({ type: CreateModalType.STACK, open: false })
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
