import React from "react";
import ReactDOM from "react-dom/client";
import { WishlistWidget } from "./WishlistWidget";

export const WishlistWidgetAPI = {
  render: (container: HTMLElement) => {
    if (!container) return;
    ReactDOM.createRoot(container).render(<WishlistWidget />);
  },
};
