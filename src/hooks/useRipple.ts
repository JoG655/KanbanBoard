import { type RefObject, useRef, useCallback } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../..//tailwind.config";

const DEFAULT_COLOR = resolveConfig(tailwindConfig).theme.colors.focus;

const DEFAULT_DURATION = 500;

type MinimalEventType = {
  clientX: number;
  clientY: number;
};

export function useRipple<T extends HTMLElement>(
  enabled: boolean,
  ref: RefObject<T>,
  options: {
    color?: string;
    duration?: number;
  } = {},
) {
  const { color = DEFAULT_COLOR, duration = DEFAULT_DURATION } = options;

  const rippleSet = useRef(new Set<HTMLDivElement>());

  const rippleTrigger = useCallback(
    (e: MinimalEventType) => {
      if (!enabled || !ref.current) return;

      requestAnimationFrame(() => {
        const target = ref.current;

        if (!target) return;

        target.classList.add("ripple");

        target.style.setProperty("--ripple-animation-color", color);

        target.style.setProperty(
          "--ripple-animation-duration",
          `${duration}ms`,
        );

        const rippleElement = document.createElement("div");

        rippleElement.classList.add("ripple__animation");

        const { clientX, clientY } = e;

        const { height, width, top, left } = target.getBoundingClientRect();

        const keyboardTrigger = clientX === 0 && clientY === 0;

        if (!keyboardTrigger) {
          rippleElement.style.setProperty(
            "--ripple-animation-left",
            `${clientX - left}px`,
          );
          rippleElement.style.setProperty(
            "--ripple-animation-top",
            `${clientY - top}px`,
          );
        }

        const maxHeight = !keyboardTrigger
          ? Math.max(clientY - top, height - clientY + top)
          : height / 2;

        const maxWidth = !keyboardTrigger
          ? Math.max(clientX - left, width - clientX + left)
          : width / 2;

        rippleElement.style.setProperty(
          "--ripple-animation-size",
          `${Math.hypot(maxHeight, maxWidth) * 2}px`,
        );

        target.appendChild(rippleElement);

        rippleSet.current.add(rippleElement);

        setTimeout(() => {
          const target = ref.current;

          if (!target) return;

          target.removeChild(rippleElement);

          rippleSet.current.delete(rippleElement);

          if (!rippleSet.current.size) {
            target.classList.remove("ripple");
          }
        }, duration);
      });
    },
    [enabled, ref, color, duration],
  );

  return [rippleTrigger];
}
