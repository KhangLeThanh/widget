import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  stackSelected,
  openCreateStack,
} from "../features/wishlist/wishlistSlice";
import { StackItem } from "./StackItem";

export function StackList() {
  const dispatch = useAppDispatch();
  const { stacks, activeStackId } = useAppSelector((s) => s.wishlist);

  if (stacks.length === 0) {
    return (
      <div style={{ marginBottom: 12 }}>
        <p style={{ marginBottom: 8, color: "#6b7280" }}>No stacks yet</p>
        <button onClick={() => dispatch(openCreateStack())}>
          + Create stack
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}
    >
      {stacks.map((stack) => (
        <StackItem
          key={stack.id}
          stack={stack}
          active={stack.id === activeStackId}
          onClick={() => dispatch(stackSelected(stack.id))}
        />
      ))}

      <button onClick={() => dispatch(openCreateStack())}>+</button>
    </div>
  );
}
