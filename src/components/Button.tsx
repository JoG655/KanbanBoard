import { type VariantProps } from "class-variance-authority";
import { type MouseEvent, type ComponentPropsWithoutRef, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyle } from "../styles/buttonStyle";
import { useRipple } from "../hooks/useRipple";

export type ButtonProps = VariantProps<typeof buttonStyle> & {
  ripple?: boolean;
  childrenStack?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  btnType,
  ripple = true,
  childrenStack = false,
  className,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [rippleTrigger] = useRipple<HTMLButtonElement>(ripple, ref);

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(e);
    }

    rippleTrigger(e);
  }

  return (
    <button
      ref={ref}
      className={twMerge(
        buttonStyle({ variant, size, btnType }),
        childrenStack ? "flex-col" : null,
        className,
      )}
      onClick={handleOnClick}
      {...rest}
    >
      {children}
    </button>
  );
}
