import { type VariantProps } from "class-variance-authority";
import { selectStyle, labelStyle } from "../styles/selectStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type SelectProps = VariantProps<typeof selectStyle> &
  VariantProps<typeof labelStyle> &
  ComponentPropsWithoutRef<"select"> & {
    options: Record<string, string>;
    childrenInsertion?: "Prepend" | "Append";
  };

function LabelContent(children: SelectProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Select({
  styleVariant,
  styleSize,
  styleStack,
  className,
  children,
  options,
  childrenInsertion = "Prepend",
  ...rest
}: SelectProps) {
  return (
    <label className={labelStyle({ styleSize, styleStack })}>
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <select
        className={twMerge(selectStyle({ styleVariant, styleSize }), className)}
        {...rest}
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
      {childrenInsertion === "Append" ? LabelContent(children) : null}
    </label>
  );
}
