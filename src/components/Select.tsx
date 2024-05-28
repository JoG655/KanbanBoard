import { type VariantProps } from "class-variance-authority";
import { inputStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type SelectProps = {
  options: Record<string, string>;
} & VariantProps<typeof inputStyle> &
  ComponentPropsWithoutRef<"select"> & {
    childrenInsertion?: "Prepend" | "Append";
    childrenStack?: boolean;
  };

function LabelContent(children: SelectProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Select({
  options,
  variant,
  size,
  className,
  children,
  childrenInsertion = "Prepend",
  childrenStack = false,
  ...rest
}: SelectProps) {
  return (
    <>
      <label
        className={twMerge(
          "flex items-center gap-2 hover:cursor-pointer",
          childrenStack ? "flex-col" : null,
        )}
      >
        {childrenInsertion === "Prepend" ? LabelContent(children) : null}
        <select
          className={twMerge(
            inputStyle({ variant, size }),
            !children ? "mr-2" : null,
            className,
          )}
          {...rest}
        >
          {Object.entries(options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {childrenInsertion === "Append" ? LabelContent(children) : null}
      </label>
    </>
  );
}
