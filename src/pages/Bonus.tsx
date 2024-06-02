import { DemoSpinner } from "../layouts/DemoSpinner";
import { DemoButton } from "../layouts/DemoButton";
import { DemoSwitch } from "../layouts/DemoSwitch";
import { DemoInput } from "../layouts/DemoInput";
import { DemoSelect } from "../layouts/DemoSelect";
import { DemoModal } from "../layouts/DemoModal";

export function Bonus() {
  return (
    <div className="mt-8 grid place-items-center gap-12 text-center">
      <DemoButton />

      <DemoSwitch />

      <DemoInput />

      <DemoSelect />

      <DemoSpinner />

      <DemoModal />
    </div>
  );
}
