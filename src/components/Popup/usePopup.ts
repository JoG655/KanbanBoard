import { PopupContext } from "./Popup";
import { useContext } from "react";

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopup must be used within a Popup");
  }

  return context;
}
