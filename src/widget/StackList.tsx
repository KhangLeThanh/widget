import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { stackSelected } from "../features/wishlist/wishlistSlice";
import { StackItem } from "./StackItem";

export function StackList() {
  const dispatch = useAppDispatch();
  const { stacks, activeStackId } = useAppSelector((s) => s.wishlist);

  return (
    <div
      style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}
    >
      {stacks.map((stack) => (
        <StackItem
          key={stack.id}
          active={stack.id === activeStackId}
          name={stack.name}
          onClick={() => dispatch(stackSelected(stack.id))}
        />
      ))}
    </div>
  );
}
