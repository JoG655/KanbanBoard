import { type TaskPriorityType } from "../types/boardType";
import { type EntriesType } from "../types/utility";
import { useBoardStore } from "../stores/boardStore";
import { useState, useMemo, type FormEvent } from "react";
import { useDragStore } from "../stores/dragStore";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Search, X, Plus } from "lucide-react";
import { DropArea } from "../layouts/home/DropArea";
import { Fragment } from "react/jsx-runtime";
import { Column } from "../layouts/home/Column";

const SEARCH_TITLE_NAME = "title";

const SEARCH_DESCRIPTION_NAME = "description";

const SEARCH_PRIORITY_NAME = "priority";

type SearchPriorityType = TaskPriorityType | "Not selected";

const SEARCH_PRIORITY_OPTIONS: Record<SearchPriorityType, string> = {
  "Not selected": "Not selected",
  "Very low": "Very low",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  "Very high": "Very high",
};

const DEFAULT_SEARCH_KEYS = {
  title: "",
  description: "",
  priority: "Not selected",
};

type FormSearchKeysType = Record<
  keyof typeof DEFAULT_SEARCH_KEYS,
  string | undefined
>;

function checkSearchKeysDefaults(searchKeys: FormSearchKeysType) {
  const entries = Object.entries(searchKeys) as EntriesType<FormSearchKeysType>;

  return entries.every(
    ([key, value]) => value === undefined || value === DEFAULT_SEARCH_KEYS[key],
  );
}

export function Board() {
  const { columns, addColumn } = useBoardStore();

  const { setIsDragEnabled } = useDragStore();

  const [searchKeys, setSearchKeys] = useState(DEFAULT_SEARCH_KEYS);

  const filteredColumns = useMemo(() => {
    if (checkSearchKeysDefaults(searchKeys)) return columns;

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
            (searchKeys.priority === "Not selected" ||
              task.priority === searchKeys.priority)
          );
        });

        return {
          ...column,
          tasks: filteredTasks,
        };
      })
      .filter((column) => column.tasks.length > 0);
  }, [columns, searchKeys]);

  function handleOnSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const searchKeys: FormSearchKeysType = {
      title: formData.get(SEARCH_TITLE_NAME)?.toString().trim(),
      description: formData.get(SEARCH_DESCRIPTION_NAME)?.toString().trim(),
      priority: formData.get(SEARCH_PRIORITY_NAME)?.toString(),
    };

    setIsDragEnabled(checkSearchKeysDefaults(searchKeys));

    setSearchKeys({
      title: searchKeys.title ? searchKeys.title : DEFAULT_SEARCH_KEYS.title,
      description: searchKeys.description
        ? searchKeys.description
        : DEFAULT_SEARCH_KEYS.description,
      priority: searchKeys.priority
        ? (searchKeys.priority as SearchPriorityType)
        : DEFAULT_SEARCH_KEYS.priority,
    });
  }

  function handleOnResetSearch() {
    setIsDragEnabled(true);

    setSearchKeys(DEFAULT_SEARCH_KEYS);
  }

  function handleOnClickAdd() {
    addColumn();
  }

  return (
    <>
      <form
        className="flex flex-wrap items-end justify-evenly px-6"
        onSubmit={handleOnSubmitSearch}
        onReset={handleOnResetSearch}
      >
        <Input
          styleStack={true}
          name={SEARCH_TITLE_NAME}
          defaultValue={DEFAULT_SEARCH_KEYS.title}
        >
          Title
        </Input>
        <Input
          styleStack={true}
          name={SEARCH_DESCRIPTION_NAME}
          defaultValue={DEFAULT_SEARCH_KEYS.description}
        >
          Description
        </Input>
        <Select
          styleStack={true}
          name={SEARCH_PRIORITY_NAME}
          defaultValue={DEFAULT_SEARCH_KEYS.priority}
          options={SEARCH_PRIORITY_OPTIONS}
        >
          Priority
        </Select>
        <div className="flex items-center">
          <Button type="submit">
            <Search />
          </Button>
          <Button styleVariant="secondary" type="reset">
            <X />
          </Button>
        </div>
      </form>
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
