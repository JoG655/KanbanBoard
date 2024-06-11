import { useBoardStore } from "../stores/boardStore.ts";
import { useViewStore } from "../stores/viewStore.ts";
import { useModalStore } from "../stores/modalStore.ts";
import { useState, useMemo } from "react";
import {
  type BoardSearchKeysType,
  type BoardIsSearchActiveType,
} from "../types/boardType.ts";
import { Search } from "../layouts/board/Search";
import { DropArea } from "../layouts/board/DropArea";
import { Fragment } from "react/jsx-runtime";
import { Column } from "../layouts/board/Column";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";
import { Modals } from "../layouts/board/Modals.tsx";

export function Board() {
  const { board } = useBoardStore();

  const { view } = useViewStore();

  const { setModal } = useModalStore();

  const [searchKeys, setSearchKeys] = useState<BoardSearchKeysType>({
    title: "",
    description: "",
    priority: "",
  });

  const [isSearchActive, setIsSearchActive] =
    useState<BoardIsSearchActiveType>(false);

  const filteredBoard = useMemo(() => {
    if (!isSearchActive) return board;

    return board
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
  }, [board, searchKeys, isSearchActive]);

  function handleOnClickAdd() {
    setModal({ variant: "ColumnAdd" });
  }

  return (
    <>
      <Search
        setSearchKeys={setSearchKeys}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <div className="flex max-w-full snap-x snap-mandatory gap-2 overflow-auto overscroll-contain scroll-smooth p-2">
        <DropArea variant="column" columnIndex={0} />
        {filteredBoard.map((column, index) => (
          <Fragment key={column.columnId}>
            <Column
              columnId={column.columnId}
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
          className="snap-center"
          onClick={handleOnClickAdd}
          style={
            view === "columns&tasks" || view === "columns"
              ? { viewTransitionName: "AddColumn" }
              : {}
          }
        >
          <Plus />
          <span>Add Column</span>
        </Button>
      </div>
      <Modals />
    </>
  );
}
