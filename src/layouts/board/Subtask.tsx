import { type BoardSubtaskType } from "../../types/boardType";
import { useBoardStore } from "../../stores/boardStore";
import { Button } from "../../components/Button";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type SubtaskProps = BoardSubtaskType;

export function Subtask({
  columnId,
  taskId,
  subtaskId,
  title,
  isCompleted,
}: SubtaskProps) {
  const { toggleSubtask } = useBoardStore();

  const [isInternalCompleted, setIsInternalCompleted] = useState(isCompleted);

  const handleOnClick = () => {
    setIsInternalCompleted((previousIsInternalCompleted) => {
      return !previousIsInternalCompleted;
    });

    toggleSubtask(columnId, taskId, subtaskId);
  };

  return (
    <Button
      styleVariant={isInternalCompleted ? "secondary" : "primary"}
      className={twMerge(
        "snap-start",
        isInternalCompleted ? "line-through" : null,
      )}
      onClick={handleOnClick}
    >
      {title}
    </Button>
  );
}
