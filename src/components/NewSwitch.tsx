import { useState } from "react";

export const NewSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div className="relative h-5 w-14 rounded-full bg-[#E5E7EB]">
          <div
            className={`absolute -top-1 left-0 aspect-square h-7 w-7 rounded-full bg-green-500 bg-white transition ${isChecked ? "!bg-primary translate-x-full" : null}`}
          ></div>
        </div>
      </label>
    </>
  );
};
