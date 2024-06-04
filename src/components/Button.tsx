import { type VariantProps } from "class-variance-authority";
import { useRef, type MouseEvent, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyle } from "../styles/buttonStyle";
import { useRipple } from "../hooks/useRipple";

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
        buttonStyle({ styleVariant, styleSize, styleType, styleStack }),
        className,
      )}
      onClick={handleOnClick}
      {...rest}
    >
      {children}
    </button>
  );
}
