import { type RefObject, useRef, useCallback, useEffect } from "react";

const DEFAULT_THRESHOLD = 0.1;

const DEFAULT_STEP = 350;

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

        const { clientX, clientY } = e;

        const { height, width, top, left } = target.getBoundingClientRect();

        const rightBoundary = width * (1 - threshold);
        const bottomBoundary = height * (1 - threshold);
        const leftBoundary = width * threshold;
        const topBoundary = height * threshold;

        const x = clientX - left;
        const y = clientY - top;

        const { scrollLeft, scrollTop, scrollWidth, scrollHeight } = target;

        let xStep = 0;

        if (x > rightBoundary && left + width < scrollWidth) {
          xStep = step;
        } else if (x < leftBoundary && scrollLeft > 0) {
          console.log(x, leftBoundary, scrollLeft);
          console.log(clientX, left);
          xStep = -step;
        }

        let yStep = 0;

        if (y > bottomBoundary && top + height < scrollHeight) {
          yStep = step;
        } else if (y < topBoundary && scrollTop > 0) {
          yStep = -step;
        }
        console.log(xStep, yStep);
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
