import { type ButtonProps, Button } from "../Button";
import { usePopup } from "./usePopup";

export type PopupCloseProps = Omit<ButtonProps, "onClick">;

export function PopupClose({
  type = "button",
  children,
  ...rest
}: PopupCloseProps) {
  const { setIsPopupOpen } = usePopup();

  const handleOnClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <Button type={type} onClick={handleOnClick} {...rest}>
      {children}
    </Button>
  );
}
