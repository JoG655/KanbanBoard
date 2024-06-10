import { DemoButton } from "../layouts/bonus/DemoButton";
import { DemoSwitch } from "../layouts/bonus/DemoSwitch";
import { DemoInput } from "../layouts/bonus/DemoInput";
import { DemoSelect } from "../layouts/bonus/DemoSelect";
import { DemoSpinner } from "../layouts/bonus/DemoSpinner";
import { DemoPopup } from "../layouts/bonus/DemoPopup";
import { DemoModal } from "../layouts/bonus/DemoModal";

export function Bonus() {
  return (
    <div className="flex max-w-7xl flex-col gap-12 text-center">
      <DemoButton />

      <DemoSwitch />

      <DemoInput />

      <DemoSelect />

      <DemoSpinner />

      <DemoPopup />

      <DemoModal />
    </div>
  );
}
