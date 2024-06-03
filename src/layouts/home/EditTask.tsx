import { useBoardStore } from "../../stores/board";
import { Button } from "../../components/Button";

export function EditTask() {
  const { isEditableTaskOpen, setIsEditableTaskOpen, editableTask } =
    useBoardStore();

  function handleOnClickEdit() {
    editTask(columnId, id);
  }

  function handleOnClickDelete() {
    deleteTask(columnId, id);
  }

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      style={{ viewTransitionName: `card-${id}` }}
      className="cursor-grab rounded-md bg-primary-100 p-3 text-primary-800 shadow-md active:animate-pulse active:cursor-grabbing dark:bg-primary-800 dark:text-primary-100"
    >
      <h4 className="text-md max-h-10 text-balance">{title}</h4>
      <div className="flex">
        <p className="text-sm">
          {subtasks.length
            ? `${subtasksCompleted} / ${subtasks.length} subtasks`
            : "No subtasks"}
        </p>
        <Button
          styleVariant={"outline"}
          styleSize={"sm"}
          styleType={"icon"}
          onClick={handleOnClickEdit}
        >
          <Edit />
        </Button>
        <Button
          styleVariant={"outline"}
          styleSize={"sm"}
          styleType={"icon"}
          onClick={handleOnClickDelete}
        >
          <Trash className="text-red-600" />
        </Button>
      </div>
    </div>
  );
}
