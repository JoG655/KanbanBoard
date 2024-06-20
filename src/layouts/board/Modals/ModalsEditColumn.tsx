import { type BoardModalsKeysType } from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import { type FormEvent, useState, useEffect } from "react";
import { Button } from "../../../components/Button";
import { BookType, Check, RotateCcw } from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";

type BoardModalsEditColumnKeysType = Pick<BoardModalsKeysType, "title">;

const NAMES: BoardModalsEditColumnKeysType = {
  title: "title",
};

const DEFAULT_VALUES: BoardModalsEditColumnKeysType = {
  title: "",
};

export function ModalsEditColumn() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  if (modal.variant !== "ColumnEdit") {
    throw new Error(
      "ModalsEditColumn must be used within a ColumnEdit variant",
    );
  }

  const { editColumn } = useBoardStore();

  const [errors, setErrors] = useState<BoardModalsEditColumnKeysType>({
    title: "",
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

    if (isError) return;

    editColumn(modal.columnId, {
      title: title ?? modal.title,
      tasks: modal.tasks,
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
