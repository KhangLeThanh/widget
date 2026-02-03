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
    setName("");
  }

  return (
    <form style={{ marginBottom: 12 }} onSubmit={onSubmit}>
      <input
        autoFocus
        placeholder="Stack name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div style={{ marginTop: 8 }}>
        <button type="submit">Create</button>
        <button type="button" onClick={() => dispatch(closeCreateStack())}>
          Cancel
        </button>
      </div>
    </form>
  );
}
