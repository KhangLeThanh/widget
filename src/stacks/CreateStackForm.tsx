import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import {
  stackAdded,
  closeCreateStack,
} from "../features/wishlist/wishlistSlice";

export function CreateStackForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    dispatch(stackAdded(name.trim()));
    dispatch(closeCreateStack());
    setName("");
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Stack name"
        style={{
          flex: 1,
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
        }}
      />

      <button type="submit">Create</button>

      <button type="button" onClick={() => dispatch(closeCreateStack())}>
        Cancel
      </button>
    </form>
  );
}
