import { type RefObject, useRef, useCallback, useEffect } from "react";

const DEFAULT_THRESHOLD = 0.3;

const DEFAULT_STEP = 100;

type MinimalEventType = {
  clientX: number;
  clientY: number;
};

export function useDragAutoScroll<T extends HTMLElement>(
  isEnabled: boolean,
  ref: RefObject<T>,
  options: { threshold?: number; step?: number } = {},
) {
  const { threshold = DEFAULT_THRESHOLD, step = DEFAULT_STEP } = options;

  const requestIdRef = useRef<number | null>(null);

  const dragAutoScrollCallback = useCallback(
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

        const { clientY, clientX } = e;

        const { top, left, height, width } = target.getBoundingClientRect();

        if (
          clientY < top ||
          clientY > top + height ||
          clientX < left ||
          clientX > left + width
        )
          return;

        const topBoundary = height * threshold;
        const bottomBoundary = height * (1 - threshold);
        const leftBoundary = width * threshold;
        const rightBoundary = width * (1 - threshold);

        const y = clientY - top;
        const x = clientX - left;

        const { scrollTop, scrollLeft, scrollHeight, scrollWidth } = target;

        let yStep = 0;

        if (y < topBoundary && scrollTop > 0) {
          yStep = -step;
        } else if (y > bottomBoundary && top + height < scrollHeight) {
          yStep = step;
        }

        let xStep = 0;

        if (x < leftBoundary && scrollLeft > 0) {
          xStep = -step;
        } else if (x > rightBoundary && left + width < scrollWidth) {
          xStep = step;
        }

        target.scrollBy({ top: yStep, left: xStep, behavior: "smooth" });
      });
    },
    [isEnabled, ref, threshold, step],
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

  return dragAutoScrollCallback;
}
