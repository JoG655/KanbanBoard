import { type TaskType } from "../../types/boardType";
import { useBoardStore } from "../../stores/boardStore";
import { useDragStore } from "../../stores/dragStore";
import { type DragEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components/Button";
import { Edit, List, Trash } from "lucide-react";

export type TaskProps = Pick<
  TaskType,
  "id" | "columnId" | "title" | "subtasks"
> & {
  columnIndex: number;
  taskIndex: number;
};

export function Task({
  id,
  columnId,
  title,
  subtasks,
  columnIndex,
  taskIndex,
}: TaskProps) {
  const { viewTask, editTask, deleteTask } = useBoardStore();

  const { isDragEnabled, dragData, setDragData } = useDragStore();

  const subtasksCompleted = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDragData({
      variant: "task",
      columnId: columnId,
      columnIndex: columnIndex,
      taskId: id,
      taskIndex: taskIndex,
    });
  }

  function handleOnClickView() {
    viewTask(columnId, id);
  }

  function handleOnClickEdit() {
    editTask(columnId, id);
  }

  function handleOnClickDelete() {
    deleteTask(columnId, id);
  }

  return (
    <div
      className={twMerge(
        "rounded-md bg-primary-300 p-2 shadow-md dark:bg-primary-600",
        isDragEnabled ? "cursor-grab" : null,
        dragData.variant === "task" &&
          dragData.columnId === columnId &&
          dragData.taskId === id
          ? "active:animate-pulse active:cursor-grabbing"
          : null,
      )}
      style={
        dragData.variant === "task" ? { viewTransitionName: `Task-${id}` } : {}
      }
      draggable={isDragEnabled}
      onDragStart={handleDragStart}
    >
      <h4 className="text-md max-h-10 text-balance">{title}</h4>
      <div className="flex">
        <p className="text-sm">
          {subtasks.length
            ? `${subtasksCompleted} / ${subtasks.length} subtasks`
            : "No subtasks"}
        </p>
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
  );
}
