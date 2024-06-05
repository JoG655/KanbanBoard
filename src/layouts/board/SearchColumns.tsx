import {
  type TaskPriorityType,
  type SearchKeysType,
} from "../../types/boardType";
import { type EntriesType } from "../../types/utility";
import { type FormEvent } from "react";
import { useDragStore } from "../../stores/dragStore";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { Search, X } from "lucide-react";

const SEARCH_TITLE_NAME = "title";

const SEARCH_DESCRIPTION_NAME = "description";

const SEARCH_PRIORITY_NAME = "priority";

const SEARCH_PRIORITY_OPTIONS: Record<
  TaskPriorityType | "Not selected",
  string
> = {
  "Not selected": "",
  "Very low": "Very low",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  "Very high": "Very high",
};

const DEFAULT_SEARCH_KEYS: SearchKeysType = {
  title: "",
  description: "",
  priority: "",
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

export type SearchColumnsProps = {
  setSearchKeys: (value: typeof DEFAULT_SEARCH_KEYS) => void;
  setIsSearchActive: (value: boolean) => void;
};

export function SearchColumns({
  setSearchKeys,
  setIsSearchActive,
}: SearchColumnsProps) {
  const { setIsDragEnabled } = useDragStore();

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const searchKeys: FormSearchKeysType = {
      title: formData.get(SEARCH_TITLE_NAME)?.toString().trim(),
      description: formData.get(SEARCH_DESCRIPTION_NAME)?.toString().trim(),
      priority: formData.get(SEARCH_PRIORITY_NAME)?.toString(),
    };

    const isSearchKeysDefaults = checkSearchKeysDefaults(searchKeys);

    setIsSearchActive(!isSearchKeysDefaults);

    setIsDragEnabled(isSearchKeysDefaults);

    setSearchKeys({
      title: searchKeys.title ?? DEFAULT_SEARCH_KEYS.title,
      description: searchKeys.description ?? DEFAULT_SEARCH_KEYS.description,
      priority: searchKeys.priority ?? DEFAULT_SEARCH_KEYS.priority,
    });
  }

  function handleOnReset() {
    setIsDragEnabled(true);

    setSearchKeys({ ...DEFAULT_SEARCH_KEYS });
  }

  return (
    <form
      className="flex flex-wrap items-end justify-evenly px-6"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
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
  );
}
