import { type BoardModalsKeysType } from "../../types/boardType";
import { useModalStore } from "../../stores/modalStore";
import { useBoardStore } from "../../stores/boardStore";
import { type FormEvent } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { X, Check, RotateCcw } from "lucide-react";

const NAMES: BoardModalsKeysType = {
  title: "title",
};

const DEFAULT_VALUES: BoardModalsKeysType = {
  title: "",
};

export function Modals() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  const { addColumn, editColumn, addTask, editTask } = useBoardStore();

  /* function activeOnSubmitCallback(formData: FormData) {
    switch (modal.variant) {
      case "ColumnAdd":
        

        break;
      case "ColumnEdit":
        editColumn(modal.columnId, formData);

        break;
      case "TaskAdd":
        addTask(modal.columnId, formData);

        break;
      case "TaskEdit":
        editTask(modal.columnId, modal.taskId, formData);

        break;
      case "TaskView":
        break;
      default:
        break;
    }
  } */

  let activeTitle = "";
  let activeOnSubmitCallback = (formData: FormData) => {
    console.warn(formData);
  };

  switch (modal.variant) {
    case "ColumnAdd":
      activeTitle = "Add Column";

      activeOnSubmitCallback = (formData) => {
        const title = formData.get(NAMES.title)?.toString().trim();

        if (!title) return;

        addColumn({
          title,
          tasks: [],
        });
      };

      break;
    case "ColumnEdit":
      activeTitle = "Edit Column";

      break;
    case "TaskAdd":
      activeTitle = "Add Task";

      activeOnSubmitCallback = (formData) => {
        const title = formData.get(NAMES.title)?.toString().trim();

        if (!title) return;

        addTask(modal.columnId, {
          title,
          description,
          priority,
          subtasks,
        });
      };

      break;
    case "TaskEdit":
      activeTitle = "Edit Task";

      break;
    case "TaskView":
      activeTitle = "Task";

      break;
    default:
      break;
  }

  function handleOnClickClose() {
    setIsOpen(false);
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);

    activeOnSubmitCallback(formData);

    setIsOpen(false);

    target.reset();
  }

  function handleOnReset() {}

  return (
    <Modal uuid="modals" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex max-w-xl items-baseline justify-between border-b-2 border-primary-700 px-4 text-xl dark:border-primary-300">
        <h2 className="overflow-hidden text-balance break-words">
          {activeTitle}
        </h2>
        <Button
          styleVariant={"ghost"}
          styleSize={"sm"}
          className="mr-0"
          onClick={handleOnClickClose}
        >
          <X />
        </Button>
      </div>
      <form
        className="flex flex-col px-4"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
        <Input
          styleStack={true}
          name={NAMES.title}
          defaultValue={DEFAULT_VALUES.title}
        />
        <div className="flex items-center justify-center">
          <Button type="submit">
            <Check />
          </Button>
          <Button styleVariant="secondary" type="reset">
            <RotateCcw />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
