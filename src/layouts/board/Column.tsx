import { type ColumnType } from "../../types/boardType.ts";
import { useBoardStore } from "../../stores/boardStore.ts";
import { useDragStore } from "../../stores/dragStore.ts";
import { elementTransition } from "../../utils/elementTransition.ts";
import { Fragment, type DragEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components/Button.tsx";
import { Edit, Trash, Plus } from "lucide-react";
import { DropArea } from "./DropArea.tsx";
import { Task } from "./Task.tsx";

export type ColumnProps = ColumnType & {
  columnIndex: number;
};

export const Column = ({ id, title, tasks, columnIndex }: ColumnProps) => {
  const { deleteColumn, addTask } = useBoardStore();

  const { isDragEnabled, dragData, setDragData } = useDragStore();

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDragData({ variant: "column", columnId: id, columnIndex: columnIndex });
  }

  function handleOnClickEdit() {
    deleteColumn(id);
  }

  function handleOnClickDelete() {
    elementTransition(() => {
      deleteColumn(id);
    });
  }

  function handleOnClickAdd() {
    addTask(id);
  }

  return (
    <div
      className={twMerge(
        "h-full w-80 flex-shrink-0 snap-center rounded-lg bg-primary-200 p-3 sm:w-96 dark:bg-primary-700",
        isDragEnabled ? "cursor-grab" : null,
        isDragEnabled &&
          dragData.variant === "column" &&
          dragData.columnId === id
          ? "active:animate-pulse active:cursor-grabbing"
          : null,
      )}
      style={
        dragData.variant === "column"
          ? { viewTransitionName: `Column-${id}` }
          : {}
      }
      draggable={isDragEnabled}
      onDragStart={handleDragStart}
    >
      <div className="flex items-baseline justify-between">
        <h2 className="overflow-hidden text-balance break-words text-xl">{`${title} (${tasks.length})`}</h2>
        <div className="flex items-center">
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
      <div className="flex flex-col gap-1">
        <DropArea variant="task" columnIndex={columnIndex} taskIndex={0} />
        {tasks.map((task, index) => (
          <Fragment key={task.id}>
            <Task {...task} columnIndex={columnIndex} taskIndex={index} />
            <DropArea
              variant="task"
              columnIndex={columnIndex}
              taskIndex={index + 1}
            />
          </Fragment>
        ))}
        <Button
          styleVariant={"outline"}
          styleSize={"xl"}
          onClick={handleOnClickAdd}
        >
          <Plus />
          <span>Add Task</span>
        </Button>
      </div>
    </div>
  );
};
