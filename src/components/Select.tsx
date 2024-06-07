import { type VariantProps } from "class-variance-authority";
import { labelStyle, containerStyle, selectStyle } from "../styles/selectStyle";
import { type ComponentPropsWithoutRef, type MouseEvent, useRef } from "react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type SelectProps = VariantProps<typeof selectStyle> &
  VariantProps<typeof labelStyle> & {
    options: Record<string, string>;
    childrenInsertion?: "Prepend" | "Append";
    ripple?: boolean;
  } & ComponentPropsWithoutRef<"select">;

function LabelContent(children: SelectProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Select({
  styleVariant,
  styleSize,
  styleStack,
  options,
  childrenInsertion = "Prepend",
  ripple = true,
  className,
  disabled,
  children,
  ...rest
}: SelectProps) {
  const rippleRef = useRef<HTMLDivElement>(null);

  const [rippleTrigger] = useRipple<HTMLDivElement>(
    ripple && !disabled,
    rippleRef,
  );

  function handleOnClickLabel(e: MouseEvent<HTMLLabelElement>) {
    rippleTrigger(e);
  }

  return (
    <label
      className={labelStyle({ styleSize, styleStack })}
      aria-disabled={disabled}
      onClick={handleOnClickLabel}
    >
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <div ref={rippleRef} className={containerStyle()}>
        <select
          className={twMerge(
            selectStyle({ styleVariant, styleSize }),
            className,
          )}
          disabled={disabled}
          {...rest}
        >
          {Object.entries(options).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {childrenInsertion === "Append" ? LabelContent(children) : null}
    </label>
  );
}
