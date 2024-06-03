export type DragDataType = {
  type: "column" | "task";
} & (
  | {
      type: "column";
      columnId: string;
    }
  | {
      type: "task";
      columnId: string;
      taskId: string;
    }
);
