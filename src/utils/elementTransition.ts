import { flushSync } from "react-dom";

export function elementTransition(callback: () => void) {
  if (!document.startViewTransition) {
    callback();

    return;
  }

  document.startViewTransition(() => {
    flushSync(() => {
      callback();
    });
  });
}
