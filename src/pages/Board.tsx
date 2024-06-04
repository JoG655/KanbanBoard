import { useBoardStore } from "../stores/boardStore";
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
    <div className="scrollbar-hidden flex max-h-[85dvh] max-w-full snap-x snap-mandatory gap-2 overflow-auto scroll-smooth">
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
