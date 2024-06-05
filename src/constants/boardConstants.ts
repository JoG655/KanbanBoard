import {
  type BoardSearchKeysType,
  type BoardTaskDataPriorityType,
} from "../types/boardType";

export const SEARCH_NAMES: BoardSearchKeysType = {
  title: "title",
  description: "description",
  priority: "priority",
};

export const SEARCH_DEFAULT_VALUES: BoardSearchKeysType = {
  title: "",
  description: "",
  priority: "",
};

export const SEARCH_PRIORITY_OPTIONS: Record<
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
