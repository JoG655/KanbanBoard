import { type ButtonProps, Button } from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

type NavButtonProps = {
  to: string;
} & Omit<ButtonProps, "styleVariant" | "onClick">;

export function NavButton({ to, ...rest }: NavButtonProps) {
  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button
      styleVariant={location.pathname === to ? "primary" : "outline"}
      onClick={handleClick}
      {...rest}
    />
  );
}
