import { type DragEvent } from "react";
import { type DragDataType } from "../types/dragData";

export type GetDragDataRet = {
  valid: boolean;
  type: DragDataType["type"];
  columnId: string;
  taskId: string;
};

export function getDragData(e: DragEvent<HTMLDivElement>): GetDragDataRet {
  const dataTransfer = e.dataTransfer.getData("text/html");

  if (!dataTransfer)
    return {
      valid: false,
      type: "column",
      columnId: "",
      taskId: "",
    };

  const typePartial = dataTransfer.split("@");

  const type = typePartial[0] as DragDataType["type"];

  if (type === "column") {
    return {
      valid: typePartial.length == 2 && !!typePartial[1],
      type: "column",
      columnId: typePartial[1],
      taskId: "",
    };
  }

  const columnIdAndTaskIdPartial = typePartial[1].split("|");

  return {
    valid:
      typePartial.length == 2 &&
      columnIdAndTaskIdPartial.length == 2 &&
      !!columnIdAndTaskIdPartial[0] &&
      !!columnIdAndTaskIdPartial[1],
    type: "task",
    columnId: columnIdAndTaskIdPartial[0],
    taskId: columnIdAndTaskIdPartial[1],
  };
}
