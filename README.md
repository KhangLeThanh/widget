# Wishlist Dock

A **floating wishlist dock** built with **React, TypeScript, Redux Toolkit, and Tailwind CSS**.
The dock lives in the bottom-right corner and expands smoothly to the bottom-center, allowing users to manage **stacks** and **cards** with a clean, interactive UI.

---

## ✨ Features

- Floating dock (bottom-right → bottom-center when expanded)
- Stack management (create, select, delete)
- Card management (add, move between stacks via drag & drop)
- Card cover images (URL-based)
- Swipe toggle for cards
- Global state management with Redux Toolkit
- Styling with Tailwind CSS
- ⚡ Built with Vite for fast development

---

## Live Demo

Live Url: [https://khanglethanh.github.io/widget/](https://khanglethanh.github.io/widget/)

---

## Embedding the Widget

You can embed the widget on any website using an `<iframe>`:

````html
<iframe
  src="https://khanglethanh.github.io/widget/"
  width="400"
  height="600"
  style="border:none; border-radius:12px;"
></iframe>
## Tech Stack - **React** (with Hooks) - **TypeScript** - **Redux Toolkit** -
**Tailwind CSS v3** - **Vite** --- ## 🚀 Getting Started ### 1️⃣ Install
dependencies ```bash npm install
````

### 2️⃣ Run the dev server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

Build:

```
npm run build
```

---

## State Management

Global state lives in **wishlistSlice** and includes:

- `stacks`
- `cards`
- `activeStackId`
- `dockExpanded`
- `createModal`

Actions include:

- `stackAdded`
- `stackSelected`
- `stackDeleted`
- `cardAdded`
- `cardMoved`
- `dockToggled`

---
