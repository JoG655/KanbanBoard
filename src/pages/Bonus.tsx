import { DemoSpinner } from "../layouts/DemoSpinner";
import { DemoButton } from "../layouts/DemoButton";
import { DemoSwitch } from "../layouts/DemoSwitch";
import { DemoInput } from "../layouts/DemoInput";
import { DemoSelect } from "../layouts/DemoSelect";
import { DemoModal } from "../layouts/DemoModal";

export function Bonus() {
  return (
    <div className="bonus-transition mx-auto flex min-h-dvh max-w-5xl flex-col scroll-smooth">
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
