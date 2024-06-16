import { useModalStore } from "../../../stores/modalStore";
import { BookType, ListOrdered, NotebookText } from "lucide-react";
import { Input } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";

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
        <NotebookText />
      </TextArea>
      <Input readOnly defaultValue={modal.priority}>
        <ListOrdered />
      </Input>
    </div>
  );
}
