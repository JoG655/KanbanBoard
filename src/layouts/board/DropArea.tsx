import { type DragVariantType } from "../../types/dragType";
import { type DragEvent, useState } from "react";
import { useBoardStore } from "../../stores/boardStore";
import { useDragStore } from "../../stores/dragStore";
import { useViewStore } from "../../stores/viewStore";
import { validateDrag } from "../../utils/validateDrag";
import { elementTransition } from "../../utils/elementTransition";
import { twMerge } from "tailwind-merge";

type DropAreaProps = {
  variant: DragVariantType;
  columnIndex: number;
} & (
  | {
      variant: "column";
      taskIndex?: number;
    }
  | {
      variant: "task";
      taskIndex: number;
    }
);

export const DropArea = ({
  variant,
  columnIndex,
  taskIndex,
}: DropAreaProps) => {
  const { moveColumn, moveTask } = useBoardStore();

  const { isDragEnabled, drag } = useDragStore();

  const { setView } = useViewStore();

  const [isVisible, setIsVisible] = useState(false);

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    if (!validateDrag(variant, columnIndex, taskIndex, isDragEnabled, drag)) {
      e.preventDefault();

      return;
    }

    setIsVisible(true);
  }

  function handleDragLeave() {
    setIsVisible(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    if (!validateDrag(variant, columnIndex, taskIndex, isDragEnabled, drag)) {
      e.preventDefault();

      return;
    }

    const isDropColumn = drag.variant === "column" && variant === "column";

    const isDropTaks = drag.variant === "task" && variant === "task";

    if (!isDropColumn && !isDropTaks) return;

    if (isDropColumn) {
      setView("columns");
    } else if (isDropTaks) {
      setView("tasks");
    }

    setIsVisible(false);

    elementTransition(() => {
      if (isDropColumn) {
        moveColumn(drag.columnId, columnIndex);
      } else if (isDropTaks) {
        moveTask(drag.columnId, drag.taskId, columnIndex, taskIndex);
      }
    });
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div
      className={twMerge(
        "relative block transition-all before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-primary-500 before:bg-primary-400 dark:before:bg-primary-600",
        variant === "column" ? "px-2 only:px-16" : "py-2 only:py-16",
        isVisible
          ? variant === "column"
            ? "px-8 opacity-100"
            : "py-8 opacity-100"
          : "opacity-0",
        !validateDrag(variant, columnIndex, taskIndex, isDragEnabled, drag)
          ? "pointer-events-none"
          : null,
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};
