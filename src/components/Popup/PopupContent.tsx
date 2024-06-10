import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type PopupContentProps = {
  verticalDirection?: "top" | "bottom" | "center";
  horizontalDirection?: "left" | "right" | "center";
} & ComponentPropsWithoutRef<"div">;

export function PopupContent({
  verticalDirection = "bottom",
  horizontalDirection = "center",
  className,
  children,
  ...rest
}: PopupContentProps) {
  return (
    <div
      className={twMerge(
        "popup__content",
        `popup__content--vertical-${verticalDirection}`,
        `popup__content--horizontal-${horizontalDirection}`,
        className,
      )}
      {...rest}
    >
      <div className="popup__content-inner">{children}</div>
    </div>
  );
}
