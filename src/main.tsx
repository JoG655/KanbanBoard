import "mobile-drag-drop/default.css";
import { polyfill } from "mobile-drag-drop";
import { checkParentsAttribute } from "./utils/checkParentsAttribute.ts";

import "./main.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";

polyfill({
  forceApply: true,
  holdToDrag: 500,
  tryFindDraggableTarget: (e: TouchEvent) => {
    const target = e.touches[0].target;

    if (!(target instanceof Node)) return undefined;

    return checkParentsAttribute(target, "draggable", "true") ?? undefined;
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
