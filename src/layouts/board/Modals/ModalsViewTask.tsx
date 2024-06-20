import { useModalStore } from "../../../stores/modalStore";
import { BookType, NotebookText, ListOrdered, CopyMinus } from "lucide-react";
import { Input } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { Subtask } from "../Subtask";

export function ModalsViewTask() {
  const { modal } = useModalStore();

  if (modal.variant !== "TaskView") {
    throw new Error("ModalsViewTask must be used within a TaskView variant");
  }

  return (
    <div className="flex flex-col px-4">
      <Input readOnly defaultValue={modal.title}>
        <BookType />
      </Input>
      <TextArea readOnly defaultValue={modal.description}>
        <NotebookText className="mb-32" />
      </TextArea>
      <Input readOnly defaultValue={modal.priority}>
        <ListOrdered />
      </Input>
      <div className="flex">
        <CopyMinus className="mt-4" />
        <div className="flex max-h-[50dvh] grow snap-y snap-mandatory snap-center flex-col overflow-auto overscroll-contain scroll-smooth px-3">
          {modal.subtasks.map((subtask, index) => (
            <Subtask
              key={subtask.id}
              title={subtask.title}
              isCompleted={subtask.isCompleted}
              taskId={modal.id}
              subtaskIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
