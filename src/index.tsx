import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import { WishlistDock } from "./widget/WishlistDock";

const store = configureStore({ reducer: { wishlist: wishlistReducer } });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <WishlistDock />
  </Provider>
);
