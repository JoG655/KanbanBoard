import { type ButtonProps, Button } from "../Button";
import { usePopup } from "./usePopup";
import { ChevronDown } from "lucide-react";

export type PopupTogglerProps = Omit<ButtonProps, "onClick">;

export function PopupToggler({
  type = "button",
  children,
  ...rest
}: PopupTogglerProps) {
  const { setIsPopupOpen } = usePopup();

  function handleOnClick() {
    setIsPopupOpen((previousIsPopupOpen) => {
      return !previousIsPopupOpen;
    });
  }

  return (
    <Button type={type} onClick={handleOnClick} {...rest}>
      {children}
      <ChevronDown className="popup__toggler-icon" />
    </Button>
  );
}
