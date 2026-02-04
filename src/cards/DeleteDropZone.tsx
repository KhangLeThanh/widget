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
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 80,
        height: 80,
        borderRadius: 40,
        background: "red",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      Delete
    </div>
  );
}
