import { useBoardStore } from "../stores/boardStore";
import { useState, useMemo } from "react";
import { type SearchKeysType } from "../types/boardType";
import { SearchColumns } from "../layouts/board/SearchColumns";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";
import { DropArea } from "../layouts/board/DropArea";
import { Fragment } from "react/jsx-runtime";
import { Column } from "../layouts/board/Column";

export function Board() {
  const { columns, addColumn } = useBoardStore();

  const [searchKeys, setSearchKeys] = useState<SearchKeysType>({
    title: "",
    description: "",
    priority: "",
  });

  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredColumns = useMemo(() => {
    if (!isSearchActive) return columns;

    return columns
      .map((column) => {
        const filteredTasks = column.tasks.filter((task) => {
          return (
            (!searchKeys.title ||
              task.title
                .toLowerCase()
                .includes(searchKeys.title.toLowerCase())) &&
            (!searchKeys.description ||
              task.description
                .toLowerCase()
                .includes(searchKeys.description.toLowerCase())) &&
            (!searchKeys.priority || task.priority === searchKeys.priority)
          );
        });

        return {
          ...column,
          tasks: filteredTasks,
        };
      })
      .filter((column) => column.tasks.length > 0);
  }, [columns, searchKeys, isSearchActive]);

  function handleOnClickAdd() {
    addColumn();
  }

  return (
    <>
      <SearchColumns
        setSearchKeys={setSearchKeys}
        setIsSearchActive={setIsSearchActive}
      />
      <div className="scrollbar-hidden flex max-h-[70dvh] max-w-full snap-x snap-mandatory gap-2 overflow-auto scroll-smooth p-2 md:max-h-[75dvh] lg:max-h-[80dvh]">
        <DropArea variant="column" columnIndex={0} />
        {filteredColumns.map((column, index) => (
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
    </>
  );
}
