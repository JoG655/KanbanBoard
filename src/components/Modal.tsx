import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type SyntheticEvent,
  useEffect,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

export type ModalProps = {
  uuid: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
} & ComponentPropsWithoutRef<"dialog">;

export function Modal({
  uuid,
  isOpen,
  setIsOpen,
  className,
  onClick,
  onCancel,
  children,
  ...rest
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!isOpen) {
      element.close();

      return;
    }

    element.showModal();
  }, [isOpen]);

  function handleOnClick(e: MouseEvent<HTMLDialogElement>) {
    if (onClick) {
      onClick(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  }

  function handleonCancel(e: SyntheticEvent<HTMLDialogElement, Event>) {
    if (onCancel) {
      onCancel(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  }

  const root = document.querySelector("#root");

  const modal = (
    <dialog
      ref={ref}
      className={twMerge("dialog", className)}
      onClick={handleOnClick}
      onCancel={handleonCancel}
      {...rest}
    >
      <div className="p-0">{children}</div>
    </dialog>
  );

  return root ? createPortal(modal, root, uuid) : modal;
}
