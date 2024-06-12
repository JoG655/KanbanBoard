import { type BoardColumnType } from "../../types/boardType.ts";
import { useBoardStore } from "../../stores/boardStore.ts";
import { useDragStore } from "../../stores/dragStore.ts";
import { useModalStore } from "../../stores/modalStore.ts";
import { useViewStore } from "../../stores/viewStore.ts";
import { type DragEvent, type MouseEvent, useRef, Fragment } from "react";
import { useDragAutoScroll } from "../../hooks/useDragAutoScroll.ts";
import { checkTouchDevice } from "../../utils/checkTouchDevice.ts";
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

  const { drag, setDrag, isDragging, isDragEnabled, setIsDragging } =
    useDragStore();

  const { view, setView } = useViewStore();

  const { setModal } = useModalStore();

  const ref = useRef<HTMLDivElement>(null);

  const dragAutoScrollCallback = useDragAutoScroll<HTMLDivElement>(
    isDragging,
    ref,
    { step: 100 },
  );

  function handleOnDrag(e: DragEvent<HTMLDivElement>) {
    dragAutoScrollCallback(e);
  }

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDrag({ variant: "column", columnId, columnIndex: columnIndex });

    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  function handleOnMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!checkTouchDevice()) return;

    dragAutoScrollCallback(e);
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
          "flex w-80 flex-shrink-0 flex-col gap-1 rounded-lg bg-primary-200 sm:w-96 dark:bg-primary-700",
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
        onDrag={handleOnDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseMove={handleOnMouseMove}
      >
        <div className="flex items-baseline justify-between px-3">
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
        <div
          ref={ref}
          className={twMerge(
            "flex max-h-[70dvh] min-h-48 snap-center flex-col overflow-auto overscroll-contain scroll-smooth px-3",
            !isDragging ? "snap-y snap-mandatory" : null,
          )}
        >
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
            className="snap-start"
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
      </div>
    </>
  );
};
