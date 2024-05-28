import { Button, type ButtonProps } from "../../components/Button";
import { Plus } from "lucide-react";

const buttonStyleVariants: ButtonProps["styleVariant"][] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
];

const buttonStyleSizes: ButtonProps["styleSize"][] = ["sm", "md", "lg", "xl"];

export function DemoButton() {
  return (
    <>
      {buttonStyleVariants.map((buttonStyleVariant) => (
        <div
          className="flex items-start justify-center gap-6"
          key={buttonStyleVariant}
        >
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {buttonStyleVariant} Buttons
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {buttonStyleSizes.map((buttonStyleSize, index) => (
                <Button
                  key={buttonStyleSize}
                  styleVariant={buttonStyleVariant}
                  styleSize={buttonStyleSize}
                  disabled={index === buttonStyleSizes.length - 1}
                >
                  <span>Learn More</span>
                  <span>&rarr;</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {buttonStyleVariant} Icon
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {buttonStyleSizes.map((buttonStyleSize, index) => (
                <Button
                  key={buttonStyleSize}
                  styleVariant={buttonStyleVariant}
                  styleSize={buttonStyleSize}
                  styleType="icon"
                  disabled={index === buttonStyleSizes.length - 1}
                >
                  <Plus />
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {buttonStyleVariant} Stack
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {buttonStyleSizes.map((buttonStyleSize, index) => (
                <Button
                  styleVariant={buttonStyleVariant}
                  styleSize={buttonStyleSize}
                  styleStack={true}
                  disabled={index === buttonStyleSizes.length - 1}
                  key={buttonStyleSize}
                >
                  <span>Learn More</span>
                  <span>&rarr;</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
