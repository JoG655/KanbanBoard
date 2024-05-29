import { cva } from "class-variance-authority";

export const switchStyle = cva(
  [
    "relative",
    "m-2.5",
    "flex",
    "items-center",
    "rounded-full",
    "border-4",
    "bg-primary-100",
    "transition",
    "peer-focus-visible:shadow-focus",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:border-primary-300",
    "peer-disabled:bg-primary-300",
    "peer-disabled:text-primary-800",
    "dark:peer-disabled:border-primary-600",
    "dark:peer-disabled:bg-primary-600",
    "dark:peer-disabled:text-primary-100",
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
          "peer-hover:border-secondary-500",
          "peer-focus:border-secondary-700",
          "dark:border-secondary-600",
          "dark:hover:border-secondary-400",
          "dark:peer-focus:border-secondary-200",
        ],
      },
      styleSize: {
        sm: ["h-4", "w-8"],
        md: ["h-5", "w-10"],
        lg: ["h-6", "w-12"],
        xl: ["h-7", "w-14"],
      },
      styleType: {
        default: "",
        icon: "",
      },
    },
    compoundVariants: [
      { styleType: "icon", styleSize: "sm", class: ["my-1", "h-4", "w-12"] },
      { styleType: "icon", styleSize: "md", class: ["my-1.5", "h-5", "w-14"] },
      { styleType: "icon", styleSize: "lg", class: ["my-2", "h-6", "w-16"] },
      { styleType: "icon", styleSize: "xl", class: ["my-2.5", "h-7", "w-18"] },
    ],
    defaultVariants: {
      styleVariant: "primary",
      styleSize: "md",
      styleType: "default",
    },
  },
);

export const iconStyle = cva(
  [
    "absolute",
    "-left-1",
    "flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "border-2",
    "border-primary-600",
    "bg-primary-300",
    "text-primary-800",
    "transition",
    "dark:border-primary-400",
    "dark:bg-primary-950",
    "dark:text-primary-50",
  ],
  {
    variants: {
      styleSize: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-7",
      },
      styleType: {
        default: "",
        icon: ["p-0.5"],
      },
      styleState: {
        false: "",
        true: "translate-x-full",
      },
    },
    compoundVariants: [
      { styleType: "icon", styleSize: "sm", class: "size-6" },
      { styleType: "icon", styleSize: "md", class: "size-7" },
      { styleType: "icon", styleSize: "lg", class: "size-8" },
      { styleType: "icon", styleSize: "xl", class: "size-9" },
      { styleType: "icon", styleState: true, class: "rotate-360" },
    ],
    defaultVariants: {
      styleSize: "md",
      styleType: "default",
      styleState: false,
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
        false: "",
        true: "flex-col",
      },
    },
    defaultVariants: {
      styleSize: "md",
      styleStack: false,
    },
  },
);
