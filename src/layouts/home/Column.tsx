import { type ColumnType } from "../../types/board.ts";
import { useBoardStore } from "../../stores/board.ts";
import { Fragment } from "react";
import { DropArea } from "./DropArea.tsx";
import { Card } from "./Card";
import { Button } from "../../components/Button.tsx";
import { Plus } from "lucide-react";

export type ColumnProps = ColumnType & {
  columnIndex: number;
};

export const Column = ({ id, title, tasks, columnIndex }: ColumnProps) => {
  const { addTask } = useBoardStore();

  function handleOnClickAdd() {
    addTask(id);
  }

  return (
    <div className="rounded-lg bg-primary-200 p-3 dark:bg-primary-700">
      <h2 className="mb-3 text-balance text-center text-xl uppercase">{`${title} (${tasks.length})`}</h2>
      <div className="flex flex-col">
        <DropArea variant="task" columnIndex={columnIndex} taskIndex={0} />
        {tasks.map((task, index) => (
          <Fragment key={task.id}>
            <Card {...task} />
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
          styleStack={true}
          className="h-full max-w-fit"
          onClick={handleOnClickAdd}
        >
          <Plus />
          <span>Add Task</span>
        </Button>
      </div>
    </div>
  );
};
