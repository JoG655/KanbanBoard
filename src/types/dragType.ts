export type DragVariantType = "column" | "task";

export type DragType = {
  variant: DragVariantType;
  columnId: string;
  columnIndex: number;
} & (
  | {
      variant: "column";
      taskId?: string;
      taskIndex?: number;
    }
  | {
      variant: "task";
      taskId: string;
      taskIndex: number;
    }
);
