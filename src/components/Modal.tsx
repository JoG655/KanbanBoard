import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { elementTansition } from "../utils/elementTansition";
import { trapFocus } from "../utils/trapFocus";
import { createPortal, flushSync } from "react-dom";
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
      if (!document.startViewTransition) {
        element.close();

        return;
      }

      document.startViewTransition(() => {
        flushSync(() => {
          element.close();
        });
      });

      return;
    }

    if (!document.startViewTransition) {
      element.showModal();

      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        element.showModal();
      });
    });
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
        "shadow-focus-lg rounded-xl p-0 outline-none backdrop:bg-gray-400 backdrop:bg-opacity-50",
        className,
      )}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      style={{
        viewTransitionName: uuid,
      }}
      {...rest}
    >
      {children}
    </dialog>
  );

  return root ? createPortal(modal, root, uuid) : modal;
}
