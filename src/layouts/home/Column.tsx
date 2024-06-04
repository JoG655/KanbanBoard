import { type ColumnType } from "../../types/boardType.ts";
import { useBoardStore } from "../../stores/boardStore.ts";
import { useDragStore } from "../../stores/dragStore.ts";
import { type DragEvent, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { DropArea } from "./DropArea.tsx";
import { Task } from "./Task.tsx";
import { Button } from "../../components/Button.tsx";
import { Plus } from "lucide-react";

export type ColumnProps = ColumnType & {
  columnIndex: number;
};

export const Column = ({ id, title, tasks, columnIndex }: ColumnProps) => {
  const { addTask } = useBoardStore();

  const { isDragEnabled, dragData, setDragData } = useDragStore();

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDragData({ variant: "column", columnId: id, columnIndex: columnIndex });
  }

  function handleOnClickAdd() {
    addTask(id);
  }

  return (
    <div
      className={twMerge(
        "h-full flex-shrink-0 snap-center rounded-lg bg-primary-200 p-3 md:w-96 dark:bg-primary-700",
        isDragEnabled ? "cursor-grab" : null,
        dragData.variant === "column" && dragData.columnId === id
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
      <h2 className="mb-3 text-balance text-center text-xl uppercase">{`${title} (${tasks.length})`}</h2>
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
