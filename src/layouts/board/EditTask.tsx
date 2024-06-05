import { useBoardStore } from "../../stores/boardStore";
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
      className="cursor-grab rounded-md bg-primary-100 p-3 text-primary-800 shadow-md active:animate-pulse active:cursor-grabbing dark:bg-primary-800 dark:text-primary-100"
      style={{ viewTransitionName: `card-${id}` }}
      draggable="true"
      onDragStart={handleDragStart}
    >
      <h4 className="max-h-10 text-balance text-base">{title}</h4>
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
