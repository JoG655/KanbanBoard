import { useBoardStore } from "../stores/board";
import { DropArea } from "../layouts/home/DropArea";
import { Fragment } from "react/jsx-runtime";
import { Column } from "../layouts/home/Column";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";

export function Board() {
  const { columns, addColumn } = useBoardStore();

  function handleOnClickAdd() {
    addColumn();
  }

  return (
    <div className="scrollbar-hidden flex max-h-[85dvh] max-w-full overflow-hidden bg-primary-200 text-primary-800 dark:bg-primary-600 dark:text-primary-100">
      <DropArea variant="column" columnIndex={0} />
      {columns.map((column, index) => (
        <Fragment key={column.id}>
          <Column
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            columnIndex={index}
          />
          <DropArea variant="column" columnIndex={index + 1} />
        </Fragment>
      ))}
      <Button
        styleVariant={"outline"}
        styleSize={"xl"}
        styleStack={true}
        onClick={handleOnClickAdd}
      >
        <Plus />
        <span>Add Column</span>
      </Button>
    </div>
  );
}
