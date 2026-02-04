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
import { CreateModalType } from "../enum";
import "./WishlistDock.css";

export function WishlistDock() {
  const dispatch = useAppDispatch();
  const { cards, dockExpanded, activeStackId, stacks, createModal } =
    useAppSelector((s) => s.wishlist);

  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  // Calculate "+" button position for menu/forms
  useEffect(() => {
    if (plusButtonRef.current) {
      const rect = plusButtonRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.top, left: rect.left + rect.width / 2 });
    }
  }, [dockExpanded, showCreateMenu]);

  return (
    <>
      <div
        className={`wishlist-dock ${dockExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="dock-header">
          <strong>Wishlist</strong>
          {dockExpanded && (
            <div className="plus-button-container">
              <button
                ref={plusButtonRef}
                onClick={() => setShowCreateMenu((prev) => !prev)}
                className="plus-button"
              >
                +
              </button>
            </div>
          )}
          <button onClick={() => dispatch(dockToggled())}>
            {dockExpanded ? "–" : "+"}
          </button>
        </div>

        {dockExpanded && (
          <div className="dock-content">
            <StackList />
            {cards.length > 0 && <SwipeToggle />}
            <CardList />
          </div>
        )}
      </div>

      {showCreateMenu && (
        <div
          className="create-menu"
          style={{ top: popupPos.top - 80, left: popupPos.left }}
        >
          <div
            className={`menu-item ${
              !activeStackId || stacks.length === 0 ? "disabled" : ""
            }`}
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
            className="menu-item"
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
        <div className="popup-form-center">
          <AddCardForm />
        </div>
      )}

      {createModal.open && createModal.type === CreateModalType.STACK && (
        <div className="popup-form-center">
          <CreateStackForm />
        </div>
      )}
    </>
  );
}
