import { type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { switchStyle } from "../styles/switchStyle";
import { Check, X } from "lucide-react";

export type SwitchProps = VariantProps<typeof switchStyle> & {
  checked: boolean;
  checkedIcon?: ReactElement;
  uncheckedIcon?: ReactElement;
  childrenInsertion?: "Prepend" | "Append";
  childrenStack?: boolean;
} & ComponentPropsWithoutRef<"input">;

function LabelContent(children: SwitchProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Switch({
  size,
  checked,
  checkedIcon = <Check />,
  uncheckedIcon = <X />,
  childrenInsertion = "Append",
  childrenStack = false,
  className,
  children,
  ...rest
}: SwitchProps) {
  // const test = "rounded-full bg-primary-600 transition-colors peer-checked:bg-secondary-500 peer-checked:*:translate-x-6 peer-checked:*:rotate-[360deg]";
  return (
    <label
      className={twMerge(
        "inline-flex cursor-pointer items-center",
        childrenStack ? "flex-col" : null,
      )}
    >
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        {...rest}
      />
      <div className={twMerge(switchStyle({ size }), className)}>
        <div className="flex size-5 items-center justify-center rounded-full p-1 text-white shadow-sm transition-all duration-300">
          {checked ? checkedIcon : uncheckedIcon}
        </div>
      </div>
      {childrenInsertion === "Append" ? LabelContent(children) : null}
    </label>
  );
}
