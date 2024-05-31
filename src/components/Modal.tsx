import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { elementTransition } from "../utils/elementTransition";
import { trapFocus } from "../utils/trapFocus";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

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
  onKeyDown,
  children,
  ...rest
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!isOpen) {
      elementTransition(() => element.close());

      return;
    }

    elementTransition(() => element.showModal());
  }, [isOpen]);

  function handleOnClick(e: MouseEvent<HTMLDialogElement>) {
    if (onClick) {
      onClick(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    setIsOpen(false);
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (onKeyDown) {
      onKeyDown(e);
    }

    const element = ref.current;

    if (!element || e.target !== element) return;

    trapFocus(element, e);

    if (e.key !== "Escape") return;

    setIsOpen(false);
  }

  const root = document.querySelector("#root");

  const modal = (
    <dialog
      ref={ref}
      className={twMerge(
        "modal-transition z-40 rounded-xl p-0 shadow-focus-lg outline-none backdrop:bg-primary-300 backdrop:bg-opacity-50 dark:backdrop:bg-primary-800 dark:backdrop:bg-opacity-50",
        className,
      )}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      {...rest}
    >
      {children}
    </dialog>
  );

  return root ? createPortal(modal, root, uuid) : modal;
}
