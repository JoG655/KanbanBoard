import { type VariantProps } from "class-variance-authority";
import { switchStyle, labelStyle, iconStyle } from "../styles/switchStyle";
import { Check, X } from "lucide-react";
import {
  useState,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ChangeEvent,
} from "react";
import { twMerge } from "tailwind-merge";

export type SwitchProps = VariantProps<typeof switchStyle> &
  VariantProps<typeof labelStyle> & {
    checkedIcon?: ReactElement;
    uncheckedIcon?: ReactElement;
    childrenInsertion?: "Prepend" | "Append";
  } & Omit<ComponentPropsWithoutRef<"input">, "type" | "checked">;

function LabelContent(children: SwitchProps["children"]) {
  if (!children) return null;

  return <span className="flex gap-1">{children}</span>;
}

export function Switch({
  styleVariant,
  styleSize,
  styleType,
  styleStack,
  checkedIcon = <Check />,
  uncheckedIcon = <X />,
  childrenInsertion = "Prepend",
  className,
  defaultChecked = false,
  onChange,
  children,
  ...rest
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }

    setIsChecked(e.target.checked);
  }

  // const test = "rounded-full bg-primary-600 transition-colors peer-checked:bg-secondary-500 peer-checked:*:translate-x-6 peer-checked:*:rotate-[360deg]";
  return (
    <label className={twMerge(labelStyle({ styleSize, styleStack }))}>
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={handleOnChange}
        {...rest}
      />
      <div
        className={twMerge(
          switchStyle({ styleVariant, styleSize, styleType }),
          className,
        )}
      >
        <div
          className={twMerge(
            iconStyle({ styleSize, styleType, styleState: isChecked }),
          )}
        >
          {styleType === "icon"
            ? isChecked
              ? checkedIcon
              : uncheckedIcon
            : null}
        </div>
      </div>
      {childrenInsertion === "Append" ? LabelContent(children) : null}
    </label>
  );
}
