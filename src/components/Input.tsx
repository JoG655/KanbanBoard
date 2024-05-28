import { type VariantProps } from "class-variance-authority";
import { inputStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = VariantProps<typeof inputStyle> &
  ComponentPropsWithoutRef<"input"> & {
    childrenInsertion?: "Prepend" | "Append";
    childrenStack?: boolean;
  };

function LabelContent(children: InputProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Input({
  variant,
  size,
  className,
  children,
  childrenInsertion = "Prepend",
  childrenStack = false,
  ...rest
}: InputProps) {
  return (
    <>
      <label
        className={twMerge(
          "flex items-center gap-2 hover:cursor-pointer",
          childrenStack ? "flex-col" : null,
        )}
      >
        {childrenInsertion === "Prepend" ? LabelContent(children) : null}
        <input
          className={twMerge(
            inputStyle({ variant, size }),
            !children ? "mr-2" : null,
            className,
          )}
          {...rest}
        />
        {childrenInsertion === "Append" ? LabelContent(children) : null}
      </label>
    </>
  );
}
