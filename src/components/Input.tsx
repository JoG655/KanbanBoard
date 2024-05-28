import { type VariantProps } from "class-variance-authority";
import { inputStyle, labelStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = VariantProps<typeof inputStyle> &
  VariantProps<typeof labelStyle> &
  ComponentPropsWithoutRef<"input"> & {
    childrenInsertion?: "Prepend" | "Append";
  };

function LabelContent(children: InputProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Input({
  styleVariant,
  styleSize,
  styleStack,
  className,
  children,
  childrenInsertion = "Prepend",
  ...rest
}: InputProps) {
  return (
    <>
      <label className={labelStyle({ styleStack })}>
        {childrenInsertion === "Prepend" ? LabelContent(children) : null}
        <input
          className={twMerge(
            inputStyle({ styleVariant, styleSize }),
            className,
          )}
          {...rest}
        />
        {childrenInsertion === "Append" ? LabelContent(children) : null}
      </label>
    </>
  );
}
