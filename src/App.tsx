import "./App.css";

import { Button, type ButtonProps } from "./components/Button";
import { Spinner, type SpinnerProps } from "./components/Spinner";
import { Moon, Plus, Sun } from "lucide-react";
import { Switch } from "./components/Switch";
import { useState } from "react";

const spinnerTexts: string[] = ["", "Loading..."];
const spinnerAnimationCounts: SpinnerProps["animationCount"][] = [
  1, 2, 3, 4, 5,
];

const buttonVariants: ButtonProps["variant"][] = [
  "primary",
  "outline",
  "ghost",
];
const buttonSizes: ButtonProps["size"][] = ["sm", "md", "lg", "xl"];

function Bonus() {
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
                {spinnerTexts.map((spinnerText) => (
                  <div
                    className="flex items-center justify-center gap-6"
                    key={spinnerText}
                  >
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {spinnerText} Spinner
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {spinnerAnimationCounts.map((spinnerAnimationCount) => (
                          <Spinner
                            animationCount={spinnerAnimationCount}
                            key={spinnerAnimationCount}
                          >
                            {spinnerText ? spinnerText : null}
                          </Spinner>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {buttonVariants.map((buttonVariant) => (
                  <div
                    className="flex items-center justify-center gap-6"
                    key={buttonVariant}
                  >
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonVariant} Buttons
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonSizes.map((buttonSize, index) => (
                          <Button
                            variant={buttonVariant}
                            size={buttonSize}
                            disabled={index === buttonSizes.length - 1}
                            key={buttonSize}
                          >
                            <span>Learn More</span>
                            <span>&rarr;</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonVariant} Icon
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonSizes.map((buttonSize, index) => (
                          <Button
                            variant={buttonVariant}
                            size={buttonSize}
                            btnType="icon"
                            disabled={index === buttonSizes.length - 1}
                            key={buttonSize}
                          >
                            <Plus />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="sticky top-0 flex w-full items-center justify-center gap-4 border-b-2 border-primary-700 bg-white p-4 text-lg"></nav>
      <main className="mx-auto flex min-h-dvh max-w-7xl flex-grow flex-col items-center scroll-smooth px-1 py-4 md:px-4 md:py-6">
        <Bonus />
      </main>
    </>
  );
}

export default App;
