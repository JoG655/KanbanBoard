import {
  SEARCH_NAMES,
  SEARCH_DEFAULT_VALUES,
  SEARCH_PRIORITY_OPTIONS,
} from "../../constants/boardConstants";
import {
  type BoardSearchKeysType,
  type BoardIsSearchActiveType,
} from "../../types/boardType";
import { type EntriesType } from "../../types/utility";
import { type FormEvent } from "react";
import { useDragStore } from "../../stores/dragStore";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { Search as SearchIcon, X } from "lucide-react";

type FormSearchKeysType = Record<keyof BoardSearchKeysType, string | undefined>;

function checkSearchKeysDefaults(searchKeys: FormSearchKeysType) {
  const entries = Object.entries(searchKeys) as EntriesType<FormSearchKeysType>;

  return entries.every(
    ([key, value]) =>
      value === undefined || value === SEARCH_DEFAULT_VALUES[key],
  );
}

type SearchProps = {
  setSearchKeys: (value: BoardSearchKeysType) => void;
  setIsSearchActive: (value: BoardIsSearchActiveType) => void;
};

export function Search({ setSearchKeys, setIsSearchActive }: SearchProps) {
  const { setIsDragEnabled } = useDragStore();

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const searchKeys: FormSearchKeysType = {
      title: formData.get(SEARCH_NAMES.title)?.toString().trim(),
      description: formData.get(SEARCH_NAMES.description)?.toString().trim(),
      priority: formData.get(SEARCH_NAMES.priority)?.toString(),
    };

    const isSearchKeysDefaults = checkSearchKeysDefaults(searchKeys);

    setIsSearchActive(!isSearchKeysDefaults);

    setIsDragEnabled(isSearchKeysDefaults);

    setSearchKeys({
      title: searchKeys.title ?? SEARCH_DEFAULT_VALUES.title,
      description: searchKeys.description ?? SEARCH_DEFAULT_VALUES.description,
      priority: searchKeys.priority ?? SEARCH_DEFAULT_VALUES.priority,
    });
  }

  function handleOnReset() {
    setIsDragEnabled(true);

    setSearchKeys({ ...SEARCH_DEFAULT_VALUES });
  }

  return (
    <form
      className="flex flex-wrap items-end justify-evenly px-6"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <Input
        styleStack={true}
        name={SEARCH_NAMES.title}
        defaultValue={SEARCH_DEFAULT_VALUES.title}
      >
        Title
      </Input>
      <Input
        styleStack={true}
        name={SEARCH_NAMES.description}
        defaultValue={SEARCH_DEFAULT_VALUES.description}
      >
        Description
      </Input>
      <Select
        styleStack={true}
        name={SEARCH_NAMES.priority}
        defaultValue={SEARCH_DEFAULT_VALUES.priority}
        options={SEARCH_PRIORITY_OPTIONS}
      >
        Priority
      </Select>
      <div className="flex items-center">
        <Button type="submit">
          <SearchIcon />
        </Button>
        <Button styleVariant="secondary" type="reset">
          <X />
        </Button>
      </div>
    </form>
  );
}
