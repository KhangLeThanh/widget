import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import {
  stackAdded,
  closeCreateStack,
} from "../features/wishlist/wishlistSlice";

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
      style={{
        padding: 12,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <h4>Create Stack</h4>

      <input
        placeholder="Stack name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <input
        placeholder="Cover image URL (optional)"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Create</button>
        <button type="button" onClick={() => dispatch(closeCreateStack())}>
          Cancel
        </button>
      </div>
    </form>
  );
}
