import { type BoardSubtaskDataType } from "../../types/boardType";
import { useBoardStore } from "../../stores/boardStore";
import { Button } from "../../components/Button";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type SubtaskProps = BoardSubtaskDataType & {
  taskId: string;
  subtaskIndex: number;
};

export function Subtask({
  title,
  isCompleted,
  taskId,
  subtaskIndex,
}: SubtaskProps) {
  const { toggleSubtask } = useBoardStore();

  const [isInternalCompleted, setIsInternalCompleted] = useState(isCompleted);

  const handleOnClick = () => {
    setIsInternalCompleted((previousIsInternalCompleted) => {
      return !previousIsInternalCompleted;
    });

    toggleSubtask(taskId, subtaskIndex);
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
