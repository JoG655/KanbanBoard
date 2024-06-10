import { type ComponentPropsWithoutRef } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { twMerge } from "tailwind-merge";

type TextType = string | number | null;

export type NotificationProps = {
  text: TextType;
} & ComponentPropsWithoutRef<"div">;

export function Notification({
  text,
  className,
  children,
  ...rest
}: NotificationProps) {
  const previousText = usePrevious<TextType>(text);

  return (
    <div className={twMerge("notification", className)} {...rest}>
      {children}
      <div className="notification__icon" aria-hidden={!text}>
        {text ? text : previousText}
      </div>
    </div>
  );
}
