import { type BoardColumnType } from "../../types/boardType.ts";
import { useBoardStore } from "../../stores/boardStore.ts";
import { useDragStore } from "../../stores/dragStore.ts";
import { useModalStore } from "../../stores/modalStore.ts";
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

  const { drag, setDrag, isDragEnabled } = useDragStore();

  const { setModal } = useModalStore();

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();

    setDrag({ variant: "column", columnId, columnIndex: columnIndex });
  }

  function handleOnClickEdit() {
    setModal({ variant: "ColumnEdit", columnId, title, tasks });
  }

  function handleOnClickDelete() {
    elementTransition(() => {
      deleteColumn(columnId);
    });
  }

  function handleOnClickAdd() {
    setModal({ variant: "ColumnAdd" });
  }

  return (
    <>
      <div
        className={twMerge(
          "h-full w-full flex-shrink-0 snap-center rounded-lg bg-primary-200 p-3 sm:w-96 dark:bg-primary-700",
          isDragEnabled ? "cursor-grab" : null,
          isDragEnabled &&
            drag.variant === "column" &&
            drag.columnId === columnId
            ? "active:animate-pulse active:cursor-grabbing"
            : null,
        )}
        style={
          drag.variant === "column"
            ? { viewTransitionName: `Column-${columnId}` }
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
          >
            <Plus />
            <span>Add Task</span>
          </Button>
        </div>
      </div>
    </>
  );
};
