import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import { ModalsAddColumn } from "./ModalsAddColumn";
import { ModalsEditColumn } from "./ModalsEditColumn";
import { ModalsAddTask } from "./ModalsAddTask";
import { ModalsEditTask } from "./ModalsEditTask";
import { ModalsViewTask } from "./ModalsViewTask";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { Trash, X } from "lucide-react";

export function Modals() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  const { deleteColumn, deleteTask } = useBoardStore();

  let activeTitle = "";

  let activeDelete = false;

  let activeComponent = <></>;

  switch (modal.variant) {
    case "ColumnAdd":
      activeTitle = "Add Column";

      activeComponent = <ModalsAddColumn />;

      break;
    case "ColumnEdit":
      activeTitle = "Edit Column";

      activeDelete = true;

      activeComponent = <ModalsEditColumn key={modal.columnId} />;

      break;
    case "TaskAdd":
      activeTitle = "Add Task";

      activeComponent = <ModalsAddTask key={modal.columnId} />;

      break;
    case "TaskEdit":
      activeTitle = "Edit Task";

      activeDelete = true;

      activeComponent = <ModalsEditTask key={modal.columnId + modal.taskId} />;

      break;
    case "TaskView":
      activeTitle = "Task";

      activeDelete = true;

      activeComponent = <ModalsViewTask key={modal.columnId + modal.taskId} />;

      break;
    default:
      break;
  }

  function handleOnClickDelete() {
    switch (modal.variant) {
      case "ColumnEdit":
        deleteColumn(modal.columnId);

        break;
      case "TaskEdit":
      case "TaskView":
        deleteTask(modal.columnId, modal.taskId);

        break;
      default:
        break;
    }

    setIsOpen(false);
  }

  function handleOnClickClose() {
    setIsOpen(false);
  }

  return (
    <Modal uuid="modals" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex min-w-96 max-w-xl items-baseline justify-between border-b-2 border-primary-500 px-4 py-2 text-xl">
        <h2 className="overflow-hidden text-balance break-words">
          {activeTitle}
        </h2>
        <div className="flex">
          {activeDelete ? (
            <Button
              styleVariant={"ghost"}
              styleSize={"sm"}
              onClick={handleOnClickDelete}
            >
              <Trash className="text-red-600" />
            </Button>
          ) : null}
          <Button
            styleVariant={"ghost"}
            styleSize={"sm"}
            className="mr-0"
            onClick={handleOnClickClose}
          >
            <X />
          </Button>
        </div>
      </div>
      {activeComponent}
    </Modal>
  );
}
