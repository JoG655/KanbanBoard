import { DemoSpinner } from "./DemoSpinner";
import { DemoButton } from "./DemoButton";
import { DemoSwitch } from "./DemoSwitch";
import { DemoInput } from "./DemoInput";
import { DemoSelect } from "./DemoSelect";
import { DemoModal } from "./DemoModal";

export function Bonus() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col scroll-smooth">
      <div className="grid flex-grow grid-cols-[auto,minmax(0,1fr)] overflow-auto">
        <div className="text-center">
          <div className="relative grid place-content-center overflow-hidden p-6 lg:p-8">
            <div className="mx-auto">
              <div className="mt-8 grid place-items-center gap-12">
                <DemoButton />

                <DemoSwitch />

                <DemoInput />

                <DemoSelect />

                <DemoSpinner />

                <DemoModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
