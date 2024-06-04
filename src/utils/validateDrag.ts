import { type DragVariantType, type DragDataType } from "../types/dragDataType";

export function validateDrag(
  variant: DragVariantType,
  columnIndex: number,
  taskIndex: number = NaN,
  isDragEnabled: boolean,
  dragData: DragDataType,
) {
  if (!isDragEnabled) return false;

  if (dragData.variant !== variant) return false;

  switch (dragData.variant) {
    case "column":
      if (dragData.columnIndex === columnIndex) return false;

      if (dragData.columnIndex + 1 === columnIndex) return false;

      break;
    case "task":
      if (dragData.columnIndex === columnIndex) {
        if (dragData.taskIndex === taskIndex) return false;

        if (dragData.taskIndex + 1 === taskIndex) return false;
      }

      break;
    default:
      return false;
  }

  return true;
}
