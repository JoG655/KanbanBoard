import {
  type BoardModalsKeysType,
  type BoardTaskDataPriorityType,
} from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import { type FormEvent, useState, useEffect } from "react";
import { Button } from "../../../components/Button";
import {
  BookType,
  ListOrdered,
  NotebookText,
  Check,
  RotateCcw,
} from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { TextArea } from "../../../components/TextArea";
import { Select } from "../../../components/Select";

type BoardModalsAddTaskKeysType = Pick<
  BoardModalsKeysType,
  "title" | "description" | "priority"
>;

const NAMES: BoardModalsAddTaskKeysType = {
  title: "title",
  description: "description",
  priority: "priority",
};

const DEFAULT_VALUES: BoardModalsAddTaskKeysType = {
  title: "",
  description: "",
  priority: "Very low",
};

const PRIORITY_OPTIONS: Record<BoardTaskDataPriorityType, string> = {
  "Very low": "Very low",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  "Very high": "Very high",
};

export function ModalsAddTask() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  const { addTask } = useBoardStore();

  const [errors, setErrors] = useState<BoardModalsAddTaskKeysType>({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    if (isOpen) return;

    setErrors(DEFAULT_VALUES);
  }, [isOpen]);

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    if (modal.variant !== "TaskAdd") {
      throw new Error("ModalsAddTask must be used within a TaskAdd variant");
    }

    e.preventDefault();

    let isError = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    const title = formData.get(NAMES.title)?.toString().trim();

    if (!title) {
      setErrors((previousErrors) => {
        return { ...previousErrors, title: "Title cannot be empty" };
      });

      isError = true;
    }

    const description = formData.get(NAMES.description)?.toString().trim();

    const priority = formData.get(NAMES.priority)?.toString().trim();

    if (isError) return;

    addTask(modal.columnId, {
      title: title ?? DEFAULT_VALUES.title,
      description: description ?? DEFAULT_VALUES.description,
      priority: (priority ??
        DEFAULT_VALUES.priority) as BoardTaskDataPriorityType,
      subtasks: [],
    });

    setIsOpen(false);

    target.reset();
  }

  function handleOnReset() {
    setErrors(DEFAULT_VALUES);
  }

  function handleOnChangeTitle() {
    setErrors((previousErrors) => {
      return { ...previousErrors, title: "" };
    });
  }

  if (modal.variant !== "TaskAdd") {
    throw new Error("ModalsAddTask must be used within a TaskAdd variant");
  }

  return (
    <form
      className="flex flex-col px-4"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <Input
        name={NAMES.title}
        placeholder="Title"
        defaultValue={DEFAULT_VALUES.title}
        onChange={handleOnChangeTitle}
      >
        <BookType />
      </Input>
      <ErrorDisplay error={errors.title} />
      <TextArea
        name={NAMES.description}
        placeholder="Description"
        defaultValue={DEFAULT_VALUES.description}
      >
        <NotebookText />
      </TextArea>
      <Select
        name={NAMES.priority}
        defaultValue={DEFAULT_VALUES.priority}
        options={PRIORITY_OPTIONS}
      >
        <ListOrdered />
      </Select>
      <div className="flex items-center justify-center">
        <Button type="submit">
          <Check />
        </Button>
        <Button styleVariant="secondary" type="reset">
          <RotateCcw />
        </Button>
      </div>
    </form>
  );
}