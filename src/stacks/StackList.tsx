import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  stackSelected,
  stackDeleted,
  openCreateStack,
} from "../features/wishlist/wishlistSlice";
import { StackItem } from "./StackItem";

export function StackList() {
  const dispatch = useAppDispatch();
  const { stacks, cards, activeStackId } = useAppSelector((s) => s.wishlist);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        marginBottom: 12,
      }}
    >
      {stacks.map((stack) => {
        const count = cards.filter((c) => c.stackId === stack.id).length;

        return (
          <StackItem
            key={stack.id}
            stack={stack}
            active={stack.id === activeStackId}
            count={count}
            onClick={() => dispatch(stackSelected(stack.id))}
            onDelete={() => dispatch(stackDeleted(stack.id))}
          />
        );
      })}

      <button onClick={() => dispatch(openCreateStack())}>+</button>
    </div>
  );
}
