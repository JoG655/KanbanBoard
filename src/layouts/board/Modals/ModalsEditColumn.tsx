import { type BoardModalsKeysType } from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import { type FormEvent, useState, useEffect } from "react";
import { BookType, Check, RotateCcw } from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { Button } from "../../../components/Button";

type KeysType = Pick<BoardModalsKeysType, "title">;

const NAMES: KeysType = {
  title: "title",
};

type ErrorsType = {
  title: string;
};

const DEFAULT_ERRORS: ErrorsType = {
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

  const [errors, setErrors] = useState<ErrorsType>(DEFAULT_ERRORS);

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

    if (isError) return;

    editColumn(modal.id, {
      title: title ?? modal.title,
      tasks: modal.tasks,
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
