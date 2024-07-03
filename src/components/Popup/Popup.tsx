import {
  type ComponentPropsWithoutRef,
  createContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { twMerge } from "tailwind-merge";

type PopupContextType = {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(
  undefined,
);

export type PopupProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "aria-haspopup" | "aria-expanded"
>;

export function Popup({ className, children, ...rest }: PopupProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClickEvent = (e: MouseEvent) => {
    const element = ref.current;

    if (!element) return;

    const target = e.target;

    if (!target) return;

    if (element.contains(target as Node)) return;

    setIsPopupOpen(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPopupOpen) return;

    document.addEventListener("click", handleClickEvent);

    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, [isPopupOpen]);

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen }}>
      <div
        ref={ref}
        className={twMerge("popup", className)}
        aria-haspopup={true}
        aria-expanded={isPopupOpen}
        {...rest}
      >
        {children}
      </div>
    </PopupContext.Provider>
  );
}
