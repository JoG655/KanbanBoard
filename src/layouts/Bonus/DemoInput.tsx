import { Input, type InputProps } from "../../components/Input";
import { Search } from "lucide-react";

const inputStyleVariants: InputProps["styleVariant"][] = [
  "primary",
  "secondary",
];

const inputStyleSizes: InputProps["styleSize"][] = ["sm", "md", "lg", "xl"];

export function DemoInput() {
  return (
    <>
      {inputStyleVariants.map((inputStyleVariant) => (
        <div
          className="flex items-start justify-center gap-6"
          key={inputStyleVariant}
        >
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {inputStyleVariant} Inputs
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {inputStyleSizes.map((inputStyleSize, index) => (
                <Input
                  key={inputStyleSize}
                  styleVariant={inputStyleVariant}
                  styleSize={inputStyleSize}
                  type="search"
                  defaultValue={
                    index === inputStyleSizes.length - 2
                      ? "Read only text"
                      : index === inputStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === inputStyleSizes.length - 2}
                  disabled={index === inputStyleSizes.length - 1}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Input>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {inputStyleVariant} Stack
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {inputStyleSizes.map((inputStyleSize, index) => (
                <Input
                  key={inputStyleSize}
                  styleVariant={inputStyleVariant}
                  styleSize={inputStyleSize}
                  styleStack={true}
                  type="search"
                  defaultValue={
                    index === inputStyleSizes.length - 2
                      ? "Read only text"
                      : index === inputStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === inputStyleSizes.length - 2}
                  disabled={index === inputStyleSizes.length - 1}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Input>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
