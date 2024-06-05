import { type DragVariantType } from "../../types/dragDataType";
import { useState, type DragEvent } from "react";
import { validateDrag } from "../../utils/validateDrag";
import { useDragStore } from "../../stores/dragStore";
import { useBoardStore } from "../../stores/boardStore";
import { elementTransition } from "../../utils/elementTransition";
import { twMerge } from "tailwind-merge";

export type DropAreaProps = {
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
  const { isDragEnabled, dragData } = useDragStore();

  const { moveColumn, moveTask } = useBoardStore();

  const [isVisible, setIsVisible] = useState(false);

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    if (
      !validateDrag(variant, columnIndex, taskIndex, isDragEnabled, dragData)
    ) {
      e.preventDefault();

      return;
    }

    setIsVisible(true);
  }

  function handleDragLeave() {
    setIsVisible(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    if (
      !validateDrag(variant, columnIndex, taskIndex, isDragEnabled, dragData)
    ) {
      e.preventDefault();

      return;
    }

    setIsVisible(false);

    elementTransition(() => {
      if (dragData.variant === "column" && variant === "column") {
        moveColumn(dragData.columnId, columnIndex);
      } else if (dragData.variant === "task" && variant === "task") {
        moveTask(dragData.columnId, dragData.taskId, columnIndex, taskIndex);
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
        !validateDrag(variant, columnIndex, taskIndex, isDragEnabled, dragData)
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
