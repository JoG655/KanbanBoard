import { Search, X } from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { type FormEvent } from "react";
import { useModalStore } from "../../stores/modalStore";

export function Modals() {
  const { isOpenColumnAdd, setIsOpenColumnAdd } = useModalStore();
  console.log(isOpenColumnAdd);

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData);
  }

  function handleOnReset() {}

  return (
    <Modal uuid="test" isOpen={isOpenColumnAdd} setIsOpen={setIsOpenColumnAdd}>
      <form
        className="flex flex-wrap items-end justify-evenly px-6"
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
      >
        <Input styleStack={true} name="test" />
        <div className="flex items-center">
          <Button type="submit">
            <Search />
          </Button>
          <Button styleVariant="secondary" type="reset">
            <X />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
