import { type DragEvent } from "react";
import { type DragDataType } from "../types/dragData";

export function setDragData(
  e: DragEvent<HTMLDivElement>,
  dragData: DragDataType,
) {
  if (dragData.type === "column") {
    e.dataTransfer.setData(
      "text/html",
      `${dragData.type}@${dragData.columnId}`,
    );

    return;
  }

  e.dataTransfer.setData(
    "text/html",
    `${dragData.type}@${dragData.columnId}|${dragData.taskId}`,
  );
}
