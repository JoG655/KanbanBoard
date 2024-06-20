import {
  type BoardModalsKeysType,
  type BoardTaskDataPriorityType,
  type BoardSubtaskType,
} from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import {
  type FormEvent,
  type ChangeEvent,
  useState,
  useEffect,
  Fragment,
} from "react";
import { getUUID } from "../../../utils/getUUID";
import { Button } from "../../../components/Button";
import {
  BookType,
  NotebookText,
  ListOrdered,
  CopyMinus,
  X,
  Plus,
  Check,
  RotateCcw,
} from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { TextArea } from "../../../components/TextArea";
import { Select } from "../../../components/Select";

type BoardModalsAddTaskKeysType = Pick<
  BoardModalsKeysType,
  "title" | "description" | "priority" | "subtasks"
>;

const NAMES: BoardModalsAddTaskKeysType = {
  title: "title",
  description: "description",
  priority: "priority",
  subtasks: [],
};

const DEFAULT_VALUES: BoardModalsAddTaskKeysType = {
  title: "",
  description: "",
  priority: "Very low",
  subtasks: [],
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

  if (modal.variant !== "TaskAdd") {
    throw new Error("ModalsAddTask must be used within a TaskAdd variant");
  }

  const { addTask } = useBoardStore();

  const [subtasks, setSubtasks] = useState<BoardSubtaskType[]>([]);

  const [errors, setErrors] = useState<BoardModalsAddTaskKeysType>({
    title: "",
    description: "",
    priority: "",
    subtasks: new Array(subtasks.length).fill(""),
  });

  useEffect(() => {
    if (isOpen) return;

    setErrors(DEFAULT_VALUES);
  }, [isOpen]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    subtasks.forEach((subtask, index) => {
      if (!subtask.title) {
        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            subtasks: previousErrors.subtasks.map((previousErrorSubtask, i) => {
              return index === i
                ? "Subtask cannot be empty"
                : previousErrorSubtask;
            }),
          };
        });

        isError = true;
      }
    });

    if (isError) return;

    addTask(modal.columnId, {
      title: title ?? DEFAULT_VALUES.title,
      description: description ?? DEFAULT_VALUES.description,
      priority: (priority ??
        DEFAULT_VALUES.priority) as BoardTaskDataPriorityType,
      subtasks,
    });

    setIsOpen(false);

    target.reset();
  };

  const handleOnReset = () => {
    setErrors(DEFAULT_VALUES);
  };

  const handleOnChangeTitle = () => {
    setErrors((previousErrors) => {
      return { ...previousErrors, title: "" };
    });
  };

  const handleOnChangeSubtaskTitle = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setSubtasks((previousSubtasks) => {
      return previousSubtasks.map((previousSubtask, i) => {
        return index === i
          ? {
              ...previousSubtask,
              title: e.target.value.trim(),
            }
          : previousSubtask;
      });
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        subtasks: previousErrors.subtasks.map((previousErrorsSubtask, i) => {
          return index === i ? "" : previousErrorsSubtask;
        }),
      };
    });
  };

  const handleOnClickDelete = (index: number) => {
    setSubtasks((previousSubtasks) => {
      return previousSubtasks.filter((_, i) => index !== i);
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        subtasks: previousErrors.subtasks.filter((_, i) => index !== i),
      };
    });
  };

  const handleOnClickAdd = () => {
    setSubtasks((previousSubtasks) => {
      return [
        ...previousSubtasks,
        {
          columnId: modal.columnId,
          taskId: "",
          subtaskId: getUUID(),
          title: "",
          isCompleted: false,
        },
      ];
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        subtasks: [...previousErrors.subtasks, ""],
      };
    });
  };

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
        <NotebookText className="mb-32" />
      </TextArea>
      <Select
        name={NAMES.priority}
        defaultValue={DEFAULT_VALUES.priority}
        options={PRIORITY_OPTIONS}
      >
        <ListOrdered />
      </Select>
      <div className="flex">
        <CopyMinus className="mt-4" />
        <div className="flex max-h-[45dvh] grow snap-y snap-mandatory snap-center flex-col overflow-auto overscroll-contain scroll-smooth px-3">
          {subtasks.map((subtask, index) => (
            <Fragment key={subtask.subtaskId}>
              <div className="flex snap-start justify-between">
                <Input
                  name={[NAMES.subtasks, index].join("-")}
                  placeholder="Subtask"
                  defaultValue={subtask.title}
                  onChange={(e) => handleOnChangeSubtaskTitle(e, index)}
                />
                <Button
                  styleVariant={"ghost"}
                  styleSize={"sm"}
                  type="button"
                  onClick={() => handleOnClickDelete(index)}
                >
                  <X />
                </Button>
              </div>
              <ErrorDisplay error={errors.subtasks[index]} />
            </Fragment>
          ))}
          <Button
            styleVariant={"outline"}
            styleSize={"lg"}
            className="snap-start"
            type="button"
            onClick={handleOnClickAdd}
          >
            <Plus />
            <span>Add Subtask</span>
          </Button>
        </div>
      </div>
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
