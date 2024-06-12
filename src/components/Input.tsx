import { type VariantProps } from "class-variance-authority";
import { labelStyle, containerStyle, inputStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef, type MouseEvent, useRef } from "react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type InputProps = VariantProps<typeof inputStyle> &
  VariantProps<typeof labelStyle> & {
    childrenInsertion?: "Prepend" | "Append";
    ripple?: boolean;
  } & ComponentPropsWithoutRef<"input">;

function LabelContent(children: InputProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Input({
  styleVariant,
  styleSize,
  styleStack,
  childrenInsertion = "Prepend",
  ripple = true,
  className,
  readOnly,
  disabled,
  children,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rippleCallback = useRipple<HTMLDivElement>(
    ripple && !readOnly && !disabled,
    ref,
  );

  function handleOnClickLabel(e: MouseEvent<HTMLLabelElement>) {
    rippleCallback(e);
  }

  return (
    <label
      className={labelStyle({ styleSize, styleStack })}
      aria-readonly={readOnly}
      aria-disabled={disabled}
      onClick={handleOnClickLabel}
    >
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <div ref={ref} className={containerStyle()}>
        <input
          className={twMerge(
            inputStyle({ styleVariant, styleSize }),
            className,
          )}
          readOnly={readOnly}
          disabled={disabled}
          {...rest}
        />
        {childrenInsertion === "Append" ? LabelContent(children) : null}
      </div>
    </label>
  );
}
