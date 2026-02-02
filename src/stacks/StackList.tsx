import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { stackSelected } from "../features/wishlist/wishlistSlice";
import { StackItem } from "./StackItem";

export function StackList() {
  const dispatch = useAppDispatch();

  const stacks = useAppSelector((s) => s.wishlist.stacks);
  const activeStackId = useAppSelector((s) => s.wishlist.activeStackId);

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
    </div>
  );
}
