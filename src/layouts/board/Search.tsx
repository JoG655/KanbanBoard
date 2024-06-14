import {
  type BoardSearchKeysType,
  type BoardTaskDataPriorityType,
  type BoardIsSearchActiveType,
} from "../../types/boardType";
import { type EntriesType } from "../../types/utility";
import { useDragStore } from "../../stores/dragStore";
import { useViewStore } from "../../stores/viewStore";
import { type FormEvent, useState } from "react";
import { elementTransition } from "../../utils/elementTransition";
import {
  Popup,
  PopupToggler,
  PopupContent,
  PopupClose,
} from "../../components/Popup";
import { Notification } from "../../components/Notification";
import { Filter, Search as SearchIcon, RotateCcw } from "lucide-react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";

const NAMES: BoardSearchKeysType = {
  title: "title",
  description: "description",
  priority: "priority",
};

const DEFAULT_VALUES: BoardSearchKeysType = {
  title: "",
  description: "",
  priority: "",
};

const PRIORITY_OPTIONS: Record<
  BoardTaskDataPriorityType | "Not selected",
  string
> = {
  "Not selected": "",
  "Very low": "Very low",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  "Very high": "Very high",
};

type FormSearchKeysType = Record<keyof BoardSearchKeysType, string | undefined>;

function checkSearchKeysDefaults(searchKeys: FormSearchKeysType) {
  const entries = Object.entries(searchKeys) as EntriesType<FormSearchKeysType>;

  return entries.every(
    ([key, value]) => value === undefined || value === DEFAULT_VALUES[key],
  );
}

type SearchProps = {
  setSearchKeys: (value: BoardSearchKeysType) => void;
  isSearchActive: BoardIsSearchActiveType;
  setIsSearchActive: (value: BoardIsSearchActiveType) => void;
};

export function Search({
  setSearchKeys,
  isSearchActive,
  setIsSearchActive,
}: SearchProps) {
  const { setIsDragEnabled } = useDragStore();

  const { view, setView } = useViewStore();

  const [isChanged, setIsChanged] = useState(false);

  function handleOnChange() {
    setIsChanged(true);
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isChanged) return;

    setIsChanged(false);

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    const searchKeys: FormSearchKeysType = {
      title: formData.get(NAMES.title)?.toString().trim(),
      description: formData.get(NAMES.description)?.toString().trim(),
      priority: formData.get(NAMES.priority)?.toString(),
    };

    const isSearchKeysDefaults = checkSearchKeysDefaults(searchKeys);

    setView("columns&tasks");

    elementTransition(() => {
      setIsSearchActive(!isSearchKeysDefaults);

      setIsDragEnabled(isSearchKeysDefaults);

      setSearchKeys({
        title: searchKeys.title ?? DEFAULT_VALUES.title,
        description: searchKeys.description ?? DEFAULT_VALUES.description,
        priority: searchKeys.priority ?? DEFAULT_VALUES.priority,
      });
    });
  }

  function handleOnReset() {
    if (!isSearchActive && !isChanged) return;

    setIsChanged(false);

    setView("columns&tasks");

    elementTransition(() => {
      setIsSearchActive(false);

      setIsDragEnabled(true);

      setSearchKeys({ ...DEFAULT_VALUES });
    });
  }

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <Popup>
        <PopupToggler>
          <Notification text={isSearchActive ? "!" : null}>
            <Filter />
          </Notification>
        </PopupToggler>
        <PopupContent
          className="flex min-w-max flex-wrap justify-center rounded-lg border-2 border-primary-500 bg-primary-200 bg-opacity-60 p-4 text-primary-800 backdrop-blur-sm dark:bg-primary-800 dark:bg-opacity-60 dark:text-primary-50"
          style={
            view === "columns&tasks" ? { viewTransitionName: "Search" } : {}
          }
        >
          <Input
            styleStack={true}
            name={NAMES.title}
            defaultValue={DEFAULT_VALUES.title}
            onChange={handleOnChange}
          >
            Title
          </Input>
          <Input
            styleStack={true}
            name={NAMES.description}
            defaultValue={DEFAULT_VALUES.description}
            onChange={handleOnChange}
          >
            Description
          </Input>
          <Select
            styleStack={true}
            name={NAMES.priority}
            defaultValue={DEFAULT_VALUES.priority}
            options={PRIORITY_OPTIONS}
            onChange={handleOnChange}
          >
            Priority
          </Select>
          <div className="flex justify-center">
            <PopupClose type="submit">
              <SearchIcon />
            </PopupClose>
            <PopupClose styleVariant="secondary" type="reset">
              <RotateCcw />
            </PopupClose>
          </div>
        </PopupContent>
      </Popup>
      <Button styleVariant="secondary" type="reset">
        <RotateCcw />
      </Button>
    </form>
  );
}
