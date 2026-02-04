import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import { WishlistDock } from "./widget/WishlistDock";

export function WishlistWidget() {
  const store = configureStore({ reducer: { wishlist: wishlistReducer } });

  return (
    <Provider store={store}>
      <WishlistDock />
    </Provider>
  );
}
