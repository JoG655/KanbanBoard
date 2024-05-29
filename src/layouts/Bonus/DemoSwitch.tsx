import { Switch, type SwitchProps } from "../../components/Switch";
import { Search } from "lucide-react";

const switchStyleVariants: SwitchProps["styleVariant"][] = [
  "primary",
  "secondary",
];

const switchStyleSizes: SwitchProps["styleSize"][] = ["sm", "md", "lg", "xl"];

export function DemoSwitch() {
  return (
    <>
      {switchStyleVariants.map((switchStyleVariant) => (
        <div
          className="flex flex-col items-center gap-6"
          key={switchStyleVariant}
        >
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {switchStyleVariant} Switchs
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {switchStyleSizes.map((switchStyleSize, index) => (
                <Switch
                  key={switchStyleSize}
                  styleVariant={switchStyleVariant}
                  styleSize={switchStyleSize}
                  defaultValue={
                    index === switchStyleSizes.length - 2
                      ? "Read only text"
                      : index === switchStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === switchStyleSizes.length - 2}
                  disabled={index === switchStyleSizes.length - 1}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Switch>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {switchStyleVariant} Stack
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {switchStyleSizes.map((switchStyleSize, index) => (
                <Switch
                  key={switchStyleSize}
                  styleVariant={switchStyleVariant}
                  styleSize={switchStyleSize}
                  styleStack={true}
                  type="search"
                  defaultValue={
                    index === switchStyleSizes.length - 2
                      ? "Read only text"
                      : index === switchStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === switchStyleSizes.length - 2}
                  disabled={index === switchStyleSizes.length - 1}
                >
                  {index > 0 ? <Search /> : "Text"}
                </Switch>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
