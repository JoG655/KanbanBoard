import { type VariantProps } from "class-variance-authority";
import { buttonStyle } from "../styles/buttonStyle";
import {
  type MouseEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type ButtonProps = VariantProps<typeof buttonStyle> & {
  ripple?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
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
    },
    forwardedRef,
  ) {
    const ref = useRef<HTMLButtonElement>(null);

    useImperativeHandle(forwardedRef, () => ref.current!, []);

    const rippleCallback = useRipple<HTMLButtonElement>(
      ripple && !disabled,
      ref,
    );

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      rippleCallback(e);
    };

    return (
      <button
        ref={ref}
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
  },
);
