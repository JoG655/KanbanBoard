import { type VariantProps } from "class-variance-authority";
import { labelStyle, containerStyle, switchStyle } from "../styles/switchStyle";
import {
  type ComponentPropsWithoutRef,
  type ReactElement,
  type MouseEvent,
  type ChangeEvent,
  useRef,
  useState,
} from "react";
import { Check, X } from "lucide-react";
import { useRipple } from "../hooks/useRipple";
import { twMerge } from "tailwind-merge";

export type SwitchProps = VariantProps<typeof switchStyle> &
  VariantProps<typeof labelStyle> & {
    checkedIcon?: ReactElement;
    uncheckedIcon?: ReactElement;
    childrenInsertion?: "Prepend" | "Append";
    ripple?: boolean;
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
  ripple = true,
  className,
  defaultChecked = false,
  disabled,
  onChange,
  children,
  ...rest
}: SwitchProps) {
  const rippleRef = useRef<HTMLDivElement>(null);

  const rippleCallback = useRipple<HTMLDivElement>(
    ripple && !disabled,
    rippleRef,
  );

  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleOnClickLabel(e: MouseEvent<HTMLLabelElement>) {
    rippleCallback(e);
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }

    setIsChecked(e.target.checked);
  }

  return (
    <label
      className={labelStyle({ styleSize, styleStack })}
      aria-disabled={disabled}
      onClick={handleOnClickLabel}
    >
      {childrenInsertion === "Prepend" ? LabelContent(children) : null}
      <div ref={rippleRef} className={containerStyle()}>
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          disabled={disabled}
          onChange={handleOnChange}
          {...rest}
        />
        <div
          className={twMerge(
            switchStyle({ styleVariant, styleSize, styleType }),
            className,
          )}
        >
          <div>
            {styleType === "icon"
              ? isChecked
                ? checkedIcon
                : uncheckedIcon
              : null}
          </div>
        </div>
      </div>
      {childrenInsertion === "Append" ? LabelContent(children) : null}
    </label>
  );
}
