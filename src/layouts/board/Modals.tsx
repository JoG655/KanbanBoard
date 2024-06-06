import { useModalStore } from "../../stores/modalStore";
import { useBoardStore } from "../../stores/boardStore";
import { useCallback, type FormEvent } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { X, Check, RotateCcw } from "lucide-react";

export function Modals() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  const { addColumn, editColumn, addTask, editTask } = useBoardStore();

  const activeOnSubmitCallback = useCallback(
    (formData: FormData) => {
      switch (modal.variant) {
        case "ColumnAdd":
          addColumn({
            title: "",
            tasks: [],
          });

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
    },
    [addColumn, editColumn, addTask, editTask, modal],
  );

  let activeTitle = "";

  switch (modal.variant) {
    case "ColumnAdd":
      activeTitle = "Add Column";

      break;
    case "ColumnEdit":
      activeTitle = "Edit Column";

      break;
    case "TaskAdd":
      activeTitle = "Add Task";

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

    const formData = new FormData(e.target as HTMLFormElement);

    activeOnSubmitCallback(formData);
  }

  function handleOnReset() {}

  return (
    <Modal uuid="modals" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex items-baseline justify-between">
        <h2 className="overflow-hidden text-balance break-words text-xl">
          {activeTitle}
        </h2>
        <div className="flex items-center">
          <Button
            styleVariant={"ghost"}
            styleSize={"sm"}
            onClick={handleOnClickClose}
          >
            <X />
          </Button>
        </div>
      </div>
      <form
        className="flex flex-wrap items-end justify-evenly px-6"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
        <Input styleStack={true} name="test" />
        <div className="flex items-center">
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
