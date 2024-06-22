import { type BoardSubtaskType } from "../../types/boardType";
import { useBoardStore } from "../../stores/boardStore";
import { Button } from "../../components/Button";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type SubtaskProps = BoardSubtaskType;

export function Subtask({ id, title, isCompleted }: SubtaskProps) {
  const { toggleSubtask } = useBoardStore();

  const [isCompletedInternal, setIsCompletedInternal] = useState(isCompleted);

  const handleOnClick = () => {
    setIsCompletedInternal((previousIsCompletedInternal) => {
      return !previousIsCompletedInternal;
    });

    toggleSubtask(id);
  };

  return (
    <Button
      styleVariant={isCompletedInternal ? "secondary" : "primary"}
      className={twMerge(
        "snap-start",
        isCompletedInternal ? "line-through" : null,
      )}
      onClick={handleOnClick}
    >
      {title}
    </Button>
  );
}
