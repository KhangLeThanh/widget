import { useAppDispatch } from "../hooks/redux";
import { cardRemoved } from "../features/wishlist/wishlistSlice";

export function DeleteDropZone() {
  const dispatch = useAppDispatch();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    if (cardId) {
      dispatch(cardRemoved(cardId));
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="fixed bottom-0 left-0 w-full h-20 bg-red-500 text-white font-bold flex items-center justify-center z-50"
    >
      Delete
    </div>
  );
}
