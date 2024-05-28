import { Moon, Sun } from "lucide-react";
import { Switch } from "../../components/Switch";
import { useState } from "react";

import { DemoSpinner } from "./DemoSpinner";
import { DemoButton } from "./DemoButton";
import { DemoInput } from "./DemoInput";
import { DemoSelect } from "./DemoSelect";

export function Bonus() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col scroll-smooth">
      <Switch
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        className="bg-primary-500 checked:bg-primary-500"
        checkedIcon={<Sun className="text-white" />}
        uncheckedIcon={<Moon className="text-white" />}
      ></Switch>
      <div className="grid flex-grow grid-cols-[auto,minmax(0,1fr)] overflow-auto">
        <div className="text-center">
          <div className="relative z-0 grid place-content-center overflow-hidden p-6 lg:p-8">
            <div className="mx-auto">
              <div className="mt-8 grid place-items-center gap-12">
                <DemoSpinner />

                <DemoButton />

                <DemoInput />

                <DemoSelect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
