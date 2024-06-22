import { useModalStore } from "../../../stores/modalStore";
import useCurrentTime from "../../../hooks/useCurrentTime";
import {
  BookType,
  NotebookText,
  ListOrdered,
  Calendar,
  CalendarCheck,
  CopyMinus,
} from "lucide-react";
import { Input } from "../../../components/Input";
import { TextArea } from "../../../components/TextArea";
import { dateMilisecondsToString } from "../../../utils/convertDate";
import { Notification } from "../../../components/Notification";
import { Subtask } from "../Subtask";

export function ModalsViewTask() {
  const { modal } = useModalStore();

  if (modal.variant !== "TaskView") {
    throw new Error("ModalsViewTask must be used within a TaskView variant");
  }

  const currentTime = useCurrentTime();

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
      <Input readOnly defaultValue={dateMilisecondsToString(modal.createdDate)}>
        <Calendar />
      </Input>
      {modal.dueDate ? (
        <Input readOnly defaultValue={dateMilisecondsToString(modal.dueDate)}>
          <Notification text={modal.dueDate <= currentTime ? "!" : null}>
            <CalendarCheck />
          </Notification>
        </Input>
      ) : null}
      {modal.subtasks.length ? (
        <div className="flex">
          <CopyMinus className="mt-4" />
          <div className="flex max-h-[50dvh] grow snap-y snap-mandatory snap-center flex-col overflow-auto overscroll-contain scroll-smooth px-3">
            {modal.subtasks.map((subtask) => (
              <Subtask key={subtask.id} {...subtask} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
