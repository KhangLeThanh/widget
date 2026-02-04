import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  stackSelected,
  stackDeleted,
} from "../features/wishlist/wishlistSlice";
import { StackItem } from "./StackItem";

export function StackList() {
  const dispatch = useAppDispatch();
  const { stacks, cards, activeStackId } = useAppSelector((s) => s.wishlist);

  return (
    <div className="flex gap-2 overflow-x-auto mb-3 py-1">
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
    </div>
  );
}
