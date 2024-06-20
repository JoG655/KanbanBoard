import { type BoardTaskType } from "../../types/boardType";
import { useModalStore } from "../../stores/modalStore";
import { useBoardStore } from "../../stores/boardStore";
import { useDragStore } from "../../stores/dragStore";
import { useViewStore } from "../../stores/viewStore";
import { type DragEvent } from "react";
import { elementTransition } from "../../utils/elementTransition";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components/Button";
import { Edit, List, Trash } from "lucide-react";

type TaskProps = BoardTaskType & {
  columnIndex: number;
  taskIndex: number;
};

export function Task({
  columnId,
  taskId,
  title,
  description,
  priority,
  subtasks,
  columnIndex,
  taskIndex,
}: TaskProps) {
  const { setModal } = useModalStore();

  const { deleteTask } = useBoardStore();

  const { isDragEnabled, drag, setDrag, isDragging, setIsDragging } =
    useDragStore();

  const { view, setView } = useViewStore();

  const subtasksCompleted = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setDrag({
      variant: "task",
      columnId,
      columnIndex,
      taskId,
      taskIndex,
    });

    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleOnClickView = () => {
    setModal({
      variant: "TaskView",
      taskId,
      columnId,
      title,
      description,
      priority,
      subtasks,
    });
  };

  const handleOnClickEdit = () => {
    setModal({
      variant: "TaskEdit",
      taskId,
      columnId,
      title,
      description,
      priority,
      subtasks,
    });
  };

  const handleOnClickDelete = () => {
    setView("tasks");

    elementTransition(() => {
      deleteTask(columnId, taskId);
    });
  };

  return (
    <div
      className={twMerge(
        "snap-start rounded-md bg-primary-300 p-2 shadow-md dark:bg-primary-600",
        isDragEnabled ? "cursor-grab" : null,
        isDragEnabled &&
          isDragging &&
          drag.variant === "task" &&
          drag.columnId === columnId &&
          drag.taskId === taskId
          ? "animate-pulse"
          : null,
      )}
      style={
        view === "columns&tasks" || view === "tasks"
          ? { viewTransitionName: `Task-${taskId}` }
          : {}
      }
      draggable={isDragEnabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h4 className="overflow-hidden text-balance break-words text-base">
        {title}
      </h4>
      <div className="flex items-baseline justify-between">
        <p className="text-sm">
          {subtasks.length
            ? `${subtasksCompleted} / ${subtasks.length} subtasks`
            : "No subtasks"}
        </p>
        <div className="flex items-center">
          <Button
            styleVariant={"outline"}
            styleSize={"sm"}
            styleType={"icon"}
            onClick={handleOnClickView}
          >
            <List />
          </Button>
          <Button
            styleVariant={"outline"}
            styleSize={"sm"}
            styleType={"icon"}
            onClick={handleOnClickEdit}
          >
            <Edit />
          </Button>
          <Button
            styleVariant={"outline"}
            styleSize={"sm"}
            styleType={"icon"}
            onClick={handleOnClickDelete}
          >
            <Trash className="text-red-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
