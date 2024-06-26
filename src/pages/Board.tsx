import { useModalStore } from "../stores/modalStore.ts";
import { useBoardStore } from "../stores/boardStore.ts";
import { useDragStore } from "../stores/dragStore.ts";
import { useViewStore } from "../stores/viewStore.ts";
import { type DragEvent, useRef, useState, useMemo } from "react";
import {
  type BoardSearchKeysType,
  type BoardIsSearchActiveType,
} from "../types/boardType.ts";
import { useDragAutoScroll } from "../hooks/useDragAutoScroll.ts";
import { twMerge } from "tailwind-merge";
import { Search } from "../layouts/board/Search";
import { DropArea } from "../layouts/board/DropArea";
import { Fragment } from "react/jsx-runtime";
import { Column } from "../layouts/board/Column";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";
import { Modals } from "../layouts/board/Modals";

export function Board() {
  const { setModal } = useModalStore();

  const { board } = useBoardStore();

  const { isDragging } = useDragStore();

  const { view } = useViewStore();

  const ref = useRef<HTMLDivElement>(null);

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

  const dragAutoScrollCallback = useDragAutoScroll<HTMLDivElement>(
    isDragging,
    ref,
    { step: 350 },
  );

  const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
    dragAutoScrollCallback(e);
  };

  const handleOnClickAdd = () => {
    setModal({ variant: "ColumnAdd" });
  };

  return (
    <>
      <Search
        setSearchKeys={setSearchKeys}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <div
        ref={ref}
        className={twMerge(
          "flex max-w-full gap-2 overflow-auto overscroll-contain scroll-smooth px-2 pb-6 pt-2",
          !isDragging ? "snap-x snap-mandatory" : null,
        )}
        onDrag={handleOnDrag}
      >
        {filteredBoard.length !== 0 ? (
          <DropArea variant="column" columnIndex={0} />
        ) : null}
        {filteredBoard.map((column, index) => (
          <Fragment key={column.id}>
            <Column {...column} columnIndex={index} />
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
