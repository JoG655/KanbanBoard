import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type TouchEvent,
  type SyntheticEvent,
  useRef,
  useEffect,
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
  onMouseDown,
  onTouchStart,
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

  const handleOnMouseDown = (e: MouseEvent<HTMLDialogElement>) => {
    if (onMouseDown) {
      onMouseDown(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  };

  const handleOnTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
    if (onTouchStart) {
      onTouchStart(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  };

  const handleOnCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    if (onCancel) {
      onCancel(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  };

  const root = document.querySelector("#root");

  const modal = (
    <dialog
      ref={ref}
      className={twMerge("modal", className)}
      onMouseDown={handleOnMouseDown}
      onTouchStart={handleOnTouchStart}
      onCancel={handleOnCancel}
      {...rest}
    >
      <div className="p-0">{children}</div>
    </dialog>
  );

  return root ? createPortal(modal, root, uuid) : modal;
}
