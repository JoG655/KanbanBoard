import { type DragVariantType, type DragType } from "../types/dragType";

export function validateDrag(
  variant: DragVariantType,
  columnIndex: number,
  taskIndex: number = NaN,
  isDragEnabled: boolean,
  drag: DragType,
) {
  if (!isDragEnabled) return false;

  if (drag.variant !== variant) return false;

  switch (drag.variant) {
    case "column":
      if (drag.columnIndex === columnIndex) return false;

      if (drag.columnIndex + 1 === columnIndex) return false;

      break;
    case "task":
      if (drag.columnIndex === columnIndex) {
        if (drag.taskIndex === taskIndex) return false;

        if (drag.taskIndex + 1 === taskIndex) return false;
      }

      break;
    default:
      return false;
  }

  return true;
}
