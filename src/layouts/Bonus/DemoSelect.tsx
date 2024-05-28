import { Select, type SelectProps } from "../../components/Select";
import { Search } from "lucide-react";

const inputStyleVariants: SelectProps["styleVariant"][] = [
  "primary",
  "secondary",
];

const inputStyleSizes: SelectProps["styleSize"][] = ["sm", "md", "lg", "xl"];

const options: SelectProps["options"] = { first: "1", second: "2", third: "3" };

export function DemoSelect() {
  return (
    <>
      {inputStyleVariants.map((inputStyleVariant) => (
        <div
          className="flex items-start justify-center gap-6"
          key={inputStyleVariant}
        >
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {inputStyleVariant} Selects
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {inputStyleSizes.map((inputStyleSize, index) => (
                <Select
                  key={inputStyleSize}
                  styleVariant={inputStyleVariant}
                  styleSize={inputStyleSize}
                  defaultValue={
                    index === inputStyleSizes.length - 1 ? "Disabled text" : ""
                  }
                  disabled={index === inputStyleSizes.length - 1}
                  options={options}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Select>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {inputStyleVariant} Stack
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {inputStyleSizes.map((inputStyleSize, index) => (
                <Select
                  key={inputStyleSize}
                  styleVariant={inputStyleVariant}
                  styleSize={inputStyleSize}
                  styleStack={true}
                  defaultValue={
                    index === inputStyleSizes.length - 1 ? "Disabled text" : ""
                  }
                  disabled={index === inputStyleSizes.length - 1}
                  options={options}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Select>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
