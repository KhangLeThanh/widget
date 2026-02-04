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
      className="fixed bottom-48 left-1/2 transform -translate-x-1/2 w-3/5 max-w-lg h-16 bg-red-500 text-white font-bold flex items-center justify-center rounded-full shadow-lg z-50 transition-all duration-200"
    >
      Drag here to delete
    </div>
  );
}
