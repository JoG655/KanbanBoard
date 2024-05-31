import { Button, type ButtonProps } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

export type NavButtonProps = {
  to: string;
} & Omit<ButtonProps, "styleVariant" | "onClick">;

export function NavButton({ to, ...rest }: NavButtonProps) {
  const navigate = useNavigate();

  const location = useLocation();

  function handleClick() {
    navigate(to);
  }

  return (
    <Button
      styleVariant={location.pathname === to ? "primary" : "outline"}
      onClick={handleClick}
      {...rest}
    />
  );
}
