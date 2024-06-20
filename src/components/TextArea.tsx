import { type VariantProps } from "class-variance-authority";
import {
  labelStyle,
  containerStyle,
  textAreaStyle,
} from "../styles/textAreaStyle";
import { type ComponentPropsWithoutRef, type MouseEvent, useRef } from "react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type TextAreaProps = VariantProps<typeof textAreaStyle> &
  VariantProps<typeof labelStyle> & {
    childrenInsertion?: "Prepend" | "Append";
    ripple?: boolean;
  } & ComponentPropsWithoutRef<"textarea">;

function LabelContent(children: TextAreaProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function TextArea({
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
}: TextAreaProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rippleCallback = useRipple<HTMLDivElement>(
    ripple && !readOnly && !disabled,
    ref,
  );

  const handleOnClickLabel = (e: MouseEvent<HTMLLabelElement>) => {
    rippleCallback(e);
  };

  return (
    <label
      className={labelStyle({ styleSize, styleStack })}
      aria-readonly={readOnly}
      aria-disabled={disabled}
      onClick={handleOnClickLabel}
    >
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <div ref={ref} className={containerStyle()}>
        <textarea
          className={twMerge(
            textAreaStyle({ styleVariant, styleSize }),
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
