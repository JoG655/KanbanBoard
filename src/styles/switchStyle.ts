import { cva } from "class-variance-authority";

export const switchStyle = cva(
  [
    "relative",
    "flex",
    "items-center",
    "rounded-full",
    "border-4",
    "bg-primary-100",
    "transition",
    "*:absolute",
    "*:-left-1",
    "*:z-10",
    "*:flex",
    "*:items-center",
    "*:justify-center",
    "*:rounded-full",
    "*:border-2",
    "*:border-primary-600",
    "*:bg-primary-300",
    "*:text-primary-800",
    "*:transition",
    "peer-checked:*:translate-x-full",
    "peer-focus-visible:shadow-focus-sm",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:border-primary-300",
    "peer-disabled:bg-primary-300",
    "peer-disabled:text-primary-800",
    "*:dark:border-primary-400",
    "*:dark:bg-primary-950",
    "*:dark:text-primary-50",
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
        sm: ["h-4", "w-8", "*:size-4"],
        md: ["h-5", "w-10", "*:size-5"],
        lg: ["h-6", "w-12", "*:size-6"],
        xl: ["h-7", "w-14", "*:size-7"],
      },
      styleType: {
        default: "",
        icon: ["*:p-0.5", "peer-checked:*:rotate-360"],
      },
    },
    compoundVariants: [
      {
        styleType: "icon",
        styleSize: "sm",
        class: ["w-12", "*:size-6"],
      },
      {
        styleType: "icon",
        styleSize: "md",
        class: ["w-14", "*:size-7"],
      },
      {
        styleType: "icon",
        styleSize: "lg",
        class: ["w-16", "*:size-8"],
      },
      {
        styleType: "icon",
        styleSize: "xl",
        class: ["w-18", "*:size-9"],
      },
    ],
    defaultVariants: {
      styleVariant: "primary",
      styleSize: "md",
      styleType: "default",
    },
  },
);

export const containerStyle = cva(["m-2.5", "rounded-lg"]);

export const labelStyle = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "leading-none",
    "cursor-pointer",
    "aria-disabled:cursor-not-allowed",
  ],
  {
    variants: {
      styleSize: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
        xl: "text-base",
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
