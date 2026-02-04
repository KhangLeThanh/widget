import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  dockToggled,
  setCreateModal,
} from "../features/wishlist/wishlistSlice";
import { StackList } from "../stacks/StackList";
import { CreateStackForm } from "../stacks/CreateStackForm";
import { AddCardForm } from "../cards/AddCardForm";
import { CardList } from "../cards/CardList";
import { SwipeToggle } from "../cards/SwipeToggle";
import { CreateModalType } from "../utils/enum";

export function WishlistDock() {
  const dispatch = useAppDispatch();
  const { cards, dockExpanded, activeStackId, stacks, createModal } =
    useAppSelector((s) => s.wishlist);

  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (plusButtonRef.current) {
      const rect = plusButtonRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.top, left: rect.left + rect.width / 2 });
    }
  }, [dockExpanded, showCreateMenu]);

  return (
    <>
      {/* Dock */}
      <div
        className={`
    fixed bottom-4 z-50 overflow-hidden rounded-xl bg-white
    shadow-[0_10px_30px_rgba(0,0,0,0.15)]
    transition-all duration-300 ease-in-out
    ${
      dockExpanded
        ? "w-[360px] min-h-[220px] right-1/2 translate-x-1/2"
        : "w-[180px] right-4 translate-x-0"
    }
  `}
      >
        <div className="flex h-12 items-center justify-between border-b border-gray-200 px-3 font-bold">
          <div>Wishlist</div>

          {dockExpanded && (
            <div className="relative">
              <button
                ref={plusButtonRef}
                onClick={() => setShowCreateMenu((p) => !p)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-2xl hover:bg-gray-200"
              >
                +
              </button>
            </div>
          )}

          <button
            onClick={() => dispatch(dockToggled())}
            className="ml-2 text-xl"
          >
            {dockExpanded ? "–" : "+"}
          </button>
        </div>

        {dockExpanded && (
          <div className="flex flex-col gap-3 p-3 mt-4">
            {stacks.length > 0 ? (
              <StackList />
            ) : (
              <p className="text-gray-500 text-center text-lg italic py-4">
                There is no stack
              </p>
            )}
            {cards.length > 0 && <SwipeToggle />}
            <CardList />
          </div>
        )}
      </div>

      {showCreateMenu && (
        <div
          className="absolute z-[100] w-[120px] -translate-x-1/2 rounded-lg border border-gray-200 bg-white text-center shadow-md"
          style={{ top: popupPos.top - 80, left: popupPos.left }}
        >
          <div
            className={`cursor-pointer border-b border-gray-200 px-3 py-2
              ${
                !activeStackId || stacks.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-100"
              }
            `}
            onClick={() => {
              if (!activeStackId || stacks.length === 0) return;
              dispatch(
                setCreateModal({ type: CreateModalType.CARD, open: true })
              );
              setShowCreateMenu(false);
            }}
          >
            Card
          </div>

          <div
            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              dispatch(
                setCreateModal({ type: CreateModalType.STACK, open: true })
              );
              setShowCreateMenu(false);
            }}
          >
            Stack
          </div>
        </div>
      )}

      {createModal.open && createModal.type === CreateModalType.CARD && (
        <div className="fixed left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <AddCardForm />
        </div>
      )}

      {createModal.open && createModal.type === CreateModalType.STACK && (
        <div className="fixed left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <CreateStackForm />
        </div>
      )}
    </>
  );
}
