import { type DragDataType } from "../../types/dragData";
import { type DragEvent, useState } from "react";
import { useDragControlStore } from "../../stores/dragControl";
import { useBoardStore } from "../../stores/board";
import { twMerge } from "tailwind-merge";
import { getDragData } from "../../utils/getDragData";

export type DropAreaProps = {
  variant: DragDataType["type"];
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
  const { isDragEnabled } = useDragControlStore();

  const { moveColumn, moveTask } = useBoardStore();

  const [isVisible, setIsVisible] = useState(false);

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    if (!isDragEnabled) {
      e.preventDefault();

      return;
    }

    const { valid, type } = getDragData(e);

    if (!valid || type !== variant) {
      e.preventDefault();

      return;
    }

    setIsVisible(true);
  }

  function handleDragLeave() {
    setIsVisible(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    if (!isDragEnabled) {
      e.preventDefault();

      return;
    }

    const { valid, type, columnId, taskId } = getDragData(e);

    if (!valid || type !== variant) {
      e.preventDefault();

      return;
    }

    setIsVisible(false);

    if (variant === "column") {
      moveColumn(columnId, columnIndex);

      return;
    }

    moveTask(columnId, taskId, columnIndex, taskIndex);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div
      className={twMerge(
        "relative transition-all before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-primary-500 before:bg-primary-400 dark:before:bg-primary-600",
        variant === "column" ? "w-2 only:w-32" : "h-2 only:h-32",
        isVisible
          ? variant === "column"
            ? "px-8 opacity-100"
            : "py-8 opacity-100"
          : "opacity-0",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};
