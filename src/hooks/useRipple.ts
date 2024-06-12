import { type RefObject, useRef, useCallback, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const DEFAULT_COLOR = resolveConfig(tailwindConfig).theme.colors.focus;

const DEFAULT_DURATION = 500;

type MinimalEventType = {
  clientX: number;
  clientY: number;
};

export function useRipple<T extends HTMLElement>(
  isEnabled: boolean,
  ref: RefObject<T>,
  options: {
    color?: string;
    duration?: number;
  } = {},
) {
  const { color = DEFAULT_COLOR, duration = DEFAULT_DURATION } = options;

  const requestIdRef = useRef<number | null>(null);

  const rippleSet = useRef(new Set<HTMLDivElement>());

  const rippleCallback = useCallback(
    (e: MinimalEventType) => {
      const requestId = requestIdRef.current;

      if (requestId !== null) {
        cancelAnimationFrame(requestId);

        requestIdRef.current = null;
      }

      if (!isEnabled || !ref.current) return;

      requestIdRef.current = requestAnimationFrame(() => {
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

        const { clientY, clientX } = e;

        const { top, left, height, width } = target.getBoundingClientRect();

        const centerRipple =
          (clientY === 0 && clientX === 0) ||
          (clientY === Math.round(top) && clientX === Math.round(left));

        if (!centerRipple) {
          rippleElement.style.setProperty(
            "--ripple-animation-top",
            `${clientY - top}px`,
          );
          rippleElement.style.setProperty(
            "--ripple-animation-left",
            `${clientX - left}px`,
          );
        }

        const maxHeight = !centerRipple
          ? Math.max(clientY - top, height - clientY + top)
          : height / 2;

        const maxWidth = !centerRipple
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
    [isEnabled, ref, color, duration],
  );

  useEffect(() => {
    if (isEnabled) return;

    const requestId = requestIdRef.current;

    if (requestId === null) return;

    cancelAnimationFrame(requestId);

    return () => {
      const requestId = requestIdRef.current;

      if (requestId === null) return;

      cancelAnimationFrame(requestId);
    };
  }, [isEnabled]);

  return rippleCallback;
}
