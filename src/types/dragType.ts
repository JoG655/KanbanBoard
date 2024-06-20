export type DragVariantType = "column" | "task";

export type DragType = {
  variant: DragVariantType;
  id: string;
} & (
  | {
      variant: "column";
      columnIndex: number;
    }
  | {
      variant: "task";
      columnIndex: number;
      taskIndex: number;
    }
);
