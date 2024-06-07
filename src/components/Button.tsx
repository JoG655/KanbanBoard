import { type VariantProps } from "class-variance-authority";
import { buttonStyle } from "../styles/buttonStyle";
import { type MouseEvent, type ComponentPropsWithoutRef, useRef } from "react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type ButtonProps = VariantProps<typeof buttonStyle> & {
  ripple?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  styleVariant,
  styleSize,
  styleType,
  styleStack,
  ripple = true,
  className,
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const rippleRef = useRef<HTMLButtonElement>(null);

  const [rippleTrigger] = useRipple<HTMLButtonElement>(
    ripple && !disabled,
    rippleRef,
  );

  function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(e);
    }

    rippleTrigger(e);
  }

  return (
    <button
      ref={rippleRef}
      className={twMerge(
        buttonStyle({ styleVariant, styleSize, styleType, styleStack }),
        className,
      )}
      disabled={disabled}
      onClick={handleOnClick}
      {...rest}
    >
      {children}
    </button>
  );
}
