import {
  type BoardModalsKeysType,
  type BoardTaskDataPriorityType,
  type BoardSubtaskType,
} from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import useCurrentTime from "../../../hooks/useCurrentTime";
import {
  type FormEvent,
  type ChangeEvent,
  useState,
  useEffect,
  Fragment,
} from "react";
import {
  dateISOToMiliseconds,
  dateMilisecondsToISO,
} from "../../../utils/convertDate";
import { getUUID } from "../../../utils/getUUID";
import {
  BookType,
  NotebookText,
  ListOrdered,
  CalendarCheck,
  CopyMinus,
  Trash,
  Plus,
  Check,
  RotateCcw,
} from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { TextArea } from "../../../components/TextArea";
import { Select } from "../../../components/Select";
import { Notification } from "../../../components/Notification";
import { Button } from "../../../components/Button";

type KeysType = Pick<
  BoardModalsKeysType,
  "title" | "description" | "priority" | "dueDate" | "subtasks"
>;

const NAMES: Omit<KeysType, "subtasks"> = {
  title: "title",
  description: "description",
  priority: "priority",
  dueDate: "dueDate",
};

const PRIORITY_OPTIONS: Record<BoardTaskDataPriorityType, string> = {
  "Very low": "Very low",
  Low: "Low",
  Medium: "Medium",
  High: "High",
  "Very high": "Very high",
};

type ErrorsType = {
  title: string;
  subtasks: string[];
};

const DEFAULT_ERRORS: ErrorsType = {
  title: "",
  subtasks: [],
};

export function ModalsEditTask() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  if (modal.variant !== "TaskEdit") {
    throw new Error("ModalsEditTask must be used within a TaskEdit variant");
  }

  const { editTask } = useBoardStore();

  const currentTime = useCurrentTime();

  const [subtasks, setSubtasks] = useState<BoardSubtaskType[]>(modal.subtasks);

  const [errors, setErrors] = useState<ErrorsType>({
    title: "",
    subtasks: new Array(subtasks.length).fill(""),
  });

  useEffect(() => {
    if (isOpen) return;

    setErrors(DEFAULT_ERRORS);
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

    const dueDate = formData.get(NAMES.dueDate)?.toString().trim();

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

    editTask(modal.id, {
      title: title ?? modal.title,
      description: description ?? modal.description,
      priority: (priority ?? modal.priority) as BoardTaskDataPriorityType,
      createdDate: modal.createdDate,
      dueDate: dueDate ? dateISOToMiliseconds(dueDate) : undefined,
      subtasks,
    });

    setIsOpen(false);

    target.reset();
  };

  const handleOnReset = () => {
    setErrors(DEFAULT_ERRORS);
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
          id: getUUID(),
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
        defaultValue={modal.title}
        onChange={handleOnChangeTitle}
      >
        <BookType />
      </Input>
      <ErrorDisplay error={errors.title} />
      <TextArea
        name={NAMES.description}
        placeholder="Description"
        defaultValue={modal.description}
      >
        <NotebookText className="mb-32" />
      </TextArea>
      <Select
        name={NAMES.priority}
        defaultValue={modal.priority}
        options={PRIORITY_OPTIONS}
      >
        <ListOrdered />
      </Select>
      <Input
        type="datetime-local"
        name={NAMES.dueDate}
        placeholder="Due Date"
        defaultValue={dateMilisecondsToISO(modal.dueDate)}
      >
        {modal.dueDate ? (
          <Notification text={modal.dueDate <= currentTime ? "!" : null}>
            <CalendarCheck />
          </Notification>
        ) : (
          <CalendarCheck />
        )}
      </Input>
      <div className="flex">
        <CopyMinus className="mt-4" />
        <div className="flex max-h-[45dvh] grow snap-y snap-mandatory snap-center flex-col overflow-auto overscroll-contain scroll-smooth px-3">
          {subtasks.map((subtask, index) => (
            <Fragment key={subtask.id}>
              <div className="flex snap-start justify-between">
                <Input
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
                  <Trash className="text-red-600" />
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
