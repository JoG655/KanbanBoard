import { cva } from "class-variance-authority";

export const buttonStyle = cva(
  [
    "m-2.5",
    "flex",
    "items-center",
    "justify-center",
    "rounded-lg",
    "transition",
    "focus:outline-none",
    "focus-visible:shadow-focus-sm",
    "disabled:cursor-not-allowed",
    "disabled:bg-primary-300",
    "disabled:text-primary-800",
    "dark:disabled:bg-primary-600",
    "dark:disabled:text-primary-100",
  ],
  {
    variants: {
      styleVariant: {
        primary: [
          "bg-primary-600",
          "text-primary-50",
          "hover:bg-primary-700",
          "active:bg-primary-800",
          "dark:bg-primary-300",
          "dark:text-primary-800",
          "dark:hover:bg-primary-200",
          "dark:active:bg-primary-100",
        ],
        secondary: [
          "bg-secondary-600",
          "text-primary-50",
          "hover:bg-secondary-700",
          "active:bg-secondary-800",
          "dark:bg-secondary-300",
          "dark:text-primary-800",
          "dark:hover:bg-secondary-200",
          "dark:active:bg-secondary-100",
        ],
        outline: [
          "border-2",
          "border-primary-600",
          "bg-primary-100",
          "text-primary-800",
          "hover:bg-primary-200",
          "active:bg-primary-300",
          "disabled:border-primary-300",
          "dark:border-primary-400",
          "dark:bg-primary-950",
          "dark:text-primary-50",
          "dark:hover:bg-primary-900",
          "dark:active:bg-primary-800",
          "dark:disabled:border-primary-600",
        ],
        ghost: [
          "bg-primary-100",
          "text-primary-800",
          "hover:bg-primary-200",
          "active:bg-primary-300",
          "dark:bg-primary-950",
          "dark:text-primary-50",
          "dark:hover:bg-primary-900",
          "dark:active:bg-primary-800",
        ],
      },
      styleSize: {
        sm: ["min-h-8", "px-2", "py-1", "text-sm"],
        md: ["min-h-9", "px-3", "py-1.5", "text-sm"],
        lg: ["min-h-10", "px-4", "py-2", "text-md"],
        xl: ["min-h-11", "px-5", "py-2.5", "text-md"],
      },
      styleType: {
        default: "",
        icon: ["rounded-full", "px-0"],
      },
      styleStack: {
        false: "",
        true: "flex-col",
      },
    },
    compoundVariants: [
      { styleType: "icon", styleSize: "sm", class: "size-9" },
      { styleType: "icon", styleSize: "md", class: "size-10" },
      { styleType: "icon", styleSize: "lg", class: "size-11" },
      { styleType: "icon", styleSize: "xl", class: "size-12" },
    ],
    defaultVariants: {
      styleVariant: "primary",
      styleSize: "md",
      styleType: "default",
      styleStack: false,
    },
  },
);
