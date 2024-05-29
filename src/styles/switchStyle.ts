import { cva } from "class-variance-authority";

export const switchStyle = cva(
  [
    "relative",
    "flex",
    "items-center",
    "rounded-full",
    "border-2",
    "bg-primary-100",
    "peer-disabled:bg-primary-300",
    "peer-disabled:text-primary-800",
    "peer-disabled:border-0",
    "dark:peer-disabled:bg-primary-600",
    "dark:peer-disabled:text-primary-100",
    "transition",
    "peer-focus-visible:ring-4",
    "peer-disabled:cursor-not-allowed",
  ],
  {
    variants: {
      styleVariant: {
        primary: [
          "border-primary-300",
          "peer-checked:bg-primary-400",
          "peer-hover:border-primary-500",
          "peer-focus:border-primary-700",
          "dark:border-primary-600",
          "dark:hover:border-primary-400",
          "dark:peer-focus:border-primary-200",
        ],
        secondary: [
          "border-secondary-300",
          "peer-checked:bg-secondary-400",
          "hover:border-secondary-500",
          "peer-focus:border-secondary-700",
          "dark:border-secondary-600",
          "dark:hover:border-secondary-400",
          "dark:peer-focus:border-secondary-200",
        ],
      },
      styleSize: {
        sm: ["min-h-8", "px-2", "py-1", "text-sm"],
        md: ["w-14", "h-5"],
        lg: ["min-h-10", "px-4", "py-2", "text-md"],
        xl: ["min-h-11", "px-5", "py-2.5", "text-md"],
      },
    },
    defaultVariants: {
      styleVariant: "primary",
      styleSize: "md",
    },
  },
);

export const labelStyle = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "leading-none",
    "hover:cursor-pointer",
  ],
  {
    variants: {
      styleSize: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-md",
        xl: "text-md",
      },
      styleStack: {
        false: "gap-2",
        true: ["flex-col", "gap-0.5"],
      },
    },
    defaultVariants: {
      styleSize: "md",
      styleStack: false,
    },
  },
);

export const iconStyle = cva(
  [
    "absolute",
    "-left-0.5",
    "transition",
    "rounded-full",
    "bg-primary-600",
    "dark:bg-primary-100",
  ],
  {
    variants: {
      styleSize: {
        sm: ["text-sm"],
        md: "size-5",
        lg: ["text-md"],
        xl: ["text-md"],
      },
      styleType: {
        default: "",
        icon: "",
      },
      styleState: {
        false: "",
        true: "translate-x-full",
      },
    },
    compoundVariants: [
      { styleType: "icon", styleSize: "sm", class: "size-9" },
      { styleType: "icon", styleSize: "md", class: "size-7" },
      { styleType: "icon", styleSize: "lg", class: "size-11" },
      { styleType: "icon", styleSize: "xl", class: "size-12" },
    ],
    defaultVariants: {
      styleSize: "md",
      styleType: "icon",
      styleState: false,
    },
  },
);
