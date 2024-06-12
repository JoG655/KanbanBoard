import { type BoardColumnType } from "../../types/boardType.ts";
import { useBoardStore } from "../../stores/boardStore.ts";
import { useDragStore } from "../../stores/dragStore.ts";
import { useModalStore } from "../../stores/modalStore.ts";
import { useViewStore } from "../../stores/viewStore.ts";
import { type DragEvent, Fragment } from "react";
import { elementTransition } from "../../utils/elementTransition.ts";
import { twMerge } from "tailwind-merge";
import { Button } from "../../components/Button.tsx";
import { Edit, Trash, Plus } from "lucide-react";
import { DropArea } from "./DropArea.tsx";
import { Task } from "./Task.tsx";

type ColumnProps = BoardColumnType & {
  columnIndex: number;
};

export const Column = ({
  columnId,
  title,
  tasks,
  columnIndex,
}: ColumnProps) => {
  const { deleteColumn } = useBoardStore();

  const { drag, setDrag, isDragEnabled, setIsDragging } = useDragStore();

  const { view, setView } = useViewStore();

  const { setModal } = useModalStore();

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDrag({ variant: "column", columnId, columnIndex: columnIndex });

    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleOnClickEdit() {
    setModal({ variant: "ColumnEdit", columnId, title, tasks });
  }

  function handleOnClickDelete() {
    setView("columns");

    elementTransition(() => {
      deleteColumn(columnId);
    });
  }

  function handleOnClickAdd() {
    setModal({ variant: "TaskAdd", columnId });
  }

  return (
    <>
      <div
        className={twMerge(
          "flex max-h-full w-80 flex-shrink-0 snap-center flex-col overflow-auto rounded-lg bg-primary-200 px-3 pb-3 sm:w-96 dark:bg-primary-700",
          isDragEnabled ? "cursor-grab" : null,
          isDragEnabled &&
            drag.variant === "column" &&
            drag.columnId === columnId
            ? "active:animate-pulse active:cursor-grabbing"
            : null,
        )}
        style={
          view === "columns&tasks" || view === "columns"
            ? { viewTransitionName: `Column-${columnId}` }
            : {}
        }
        draggable={isDragEnabled}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="sticky top-0 z-10 flex items-baseline justify-between bg-primary-200 pt-3 dark:bg-primary-700">
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
        <DropArea variant="task" columnIndex={columnIndex} taskIndex={0} />
        {tasks.map((task, index) => (
          <Fragment key={task.taskId}>
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
          style={
            view === "columns&tasks" || view === "tasks"
              ? { viewTransitionName: `AddTask-${columnId}` }
              : {}
          }
        >
          <Plus />
          <span>Add Task</span>
        </Button>
      </div>
    </>
  );
};
