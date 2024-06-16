import { type BoardModalsKeysType } from "../../../types/boardType";
import { useModalStore } from "../../../stores/modalStore";
import { useBoardStore } from "../../../stores/boardStore";
import { type FormEvent, useState, useEffect } from "react";
import { Button } from "../../../components/Button";
import { BookType, Check, RotateCcw } from "lucide-react";
import { Input } from "../../../components/Input";
import { ErrorDisplay } from "../../../components/ErrorDisplay";

type BoardModalsAddColumnKeysType = Pick<BoardModalsKeysType, "title">;

const NAMES: BoardModalsAddColumnKeysType = {
  title: "title",
};

const DEFAULT_VALUES: BoardModalsAddColumnKeysType = {
  title: "",
};

export function ModalsAddColumn() {
  const { modal, isOpen, setIsOpen } = useModalStore();

  const { addColumn } = useBoardStore();

  const [errors, setErrors] = useState<BoardModalsAddColumnKeysType>({
    title: "",
  });

  useEffect(() => {
    if (isOpen) return;

    setErrors(DEFAULT_VALUES);
  }, [isOpen]);

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    if (modal.variant !== "ColumnAdd") {
      throw new Error(
        "ModalsAddColumn must be used within a ColumnAdd variant",
      );
    }

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

    addColumn({
      title: title ?? DEFAULT_VALUES.title,
      tasks: [],
    });

    setIsOpen(false);

    target.reset();
  }

  function handleOnReset() {
    setErrors(DEFAULT_VALUES);
  }

  function handleOnChangeTitle() {
    setErrors((previousErrors) => {
      return { ...previousErrors, title: "" };
    });
  }

  if (modal.variant !== "ColumnAdd") {
    throw new Error("ModalsAddColumn must be used within a ColumnAdd variant");
  }

  return (
    <form
      className="flex flex-col px-4"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <Input
        name={NAMES.title}
        placeholder="Title"
        defaultValue={DEFAULT_VALUES.title}
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
