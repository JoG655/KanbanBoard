import { type TaskType } from "../../types/board";
import { useBoardStore } from "../../stores/board";
import { useDragControlStore } from "../../stores/dragControl";
import { type DragEvent } from "react";
import { setDragData } from "../../utils/setDragData";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components/Button";
import { Edit, List, Trash } from "lucide-react";

export type CardProps = Pick<
  TaskType,
  "id" | "columnId" | "title" | "subtasks"
>;

export function Card({ id, columnId, title, subtasks }: CardProps) {
  const { viewTask, editTask, deleteTask } = useBoardStore();

  const { isDragEnabled } = useDragControlStore();

  const subtasksCompleted = subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    setDragData(e, { type: "task", columnId: columnId, taskId: id });
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
      draggable={isDragEnabled}
      onDragStart={handleDragStart}
      style={{ viewTransitionName: `card-${id}` }}
      className={twMerge(
        "rounded-md bg-primary-100 p-1 shadow-md active:animate-pulse active:cursor-grabbing dark:bg-primary-800",
        isDragEnabled ? "cursor-grab" : null,
      )}
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
