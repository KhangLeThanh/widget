import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import {
  stackAdded,
  closeCreateStack,
} from "../features/wishlist/wishlistSlice";

export function CreateStackForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  function submit() {
    if (!name.trim()) return;

    dispatch(stackAdded(name.trim()));
    dispatch(closeCreateStack());
    setName("");
  }

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: "#f9fafb",
        marginBottom: 12,
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Stack name"
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 8,
        }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={submit}>Create</button>
        <button onClick={() => dispatch(closeCreateStack())}>Cancel</button>
      </div>
    </div>
  );
}
