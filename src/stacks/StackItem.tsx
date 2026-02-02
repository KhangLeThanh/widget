import type { Stack } from "../features/wishlist/wishlistSlice";

interface Props {
  stack: Stack;
  active: boolean;
  onClick: () => void;
}

export function StackItem({ stack, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 rounded-lg border ${
        active ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {stack.name}
    </button>
  );
}
