import {
  type BoardSearchKeysType,
  type BoardTaskDataPriorityType,
  type BoardIsSearchActiveType,
} from "../../types/boardType";
import { type EntriesType } from "../../types/utility";
import { useDragStore } from "../../stores/dragStore";
import { useViewStore } from "../../stores/viewStore";
import { type FormEvent } from "react";
import { elementTransition } from "../../utils/elementTransition";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { Search as SearchIcon, RotateCcw } from "lucide-react";

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
  setIsSearchActive: (value: BoardIsSearchActiveType) => void;
};

export function Search({ setSearchKeys, setIsSearchActive }: SearchProps) {
  const { setIsDragEnabled } = useDragStore();

  const { setView } = useViewStore();

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    const searchKeys: FormSearchKeysType = {
      title: formData.get(NAMES.title)?.toString().trim(),
      description: formData.get(NAMES.description)?.toString().trim(),
      priority: formData.get(NAMES.priority)?.toString(),
    };

    const isSearchKeysDefaults = checkSearchKeysDefaults(searchKeys);

    setIsSearchActive(!isSearchKeysDefaults);

    setIsDragEnabled(isSearchKeysDefaults);

    setView("columns&tasks");

    elementTransition(() => {
      setSearchKeys({
        title: searchKeys.title ?? DEFAULT_VALUES.title,
        description: searchKeys.description ?? DEFAULT_VALUES.description,
        priority: searchKeys.priority ?? DEFAULT_VALUES.priority,
      });
    });
  }

  function handleOnReset() {
    setIsDragEnabled(true);

    setView("columns&tasks");

    elementTransition(() => {
      setSearchKeys({ ...DEFAULT_VALUES });
    });
  }

  return (
    <form
      className="flex flex-wrap items-end justify-evenly px-6"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <Input
        styleStack={true}
        name={NAMES.title}
        defaultValue={DEFAULT_VALUES.title}
      >
        Title
      </Input>
      <Input
        styleStack={true}
        name={NAMES.description}
        defaultValue={DEFAULT_VALUES.description}
      >
        Description
      </Input>
      <Select
        styleStack={true}
        name={NAMES.priority}
        defaultValue={DEFAULT_VALUES.priority}
        options={PRIORITY_OPTIONS}
      >
        Priority
      </Select>
      <div className="flex items-center">
        <Button type="submit">
          <SearchIcon />
        </Button>
        <Button styleVariant="secondary" type="reset">
          <RotateCcw />
        </Button>
      </div>
    </form>
  );
}
