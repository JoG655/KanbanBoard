import "./App.css";

import { Spinner, type SpinnerProps } from "./components/Spinner";
import { Button, type ButtonProps } from "./components/Button";
import { Input, type InputProps } from "./components/Input";
import { Moon, Plus, Search, Sun } from "lucide-react";
import { Switch } from "./components/Switch";
import { useState } from "react";

const spinnerTexts: string[] = ["", "Loading..."];
const spinnerAnimationCounts: SpinnerProps["animationCount"][] = [
  1, 2, 3, 4, 5,
];

const buttonStyleVariants: ButtonProps["styleVariant"][] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
];
const buttonStyleSizes: ButtonProps["styleSize"][] = ["sm", "md", "lg", "xl"];

const inputStyleVariants: InputProps["styleVariant"][] = [
  "primary",
  "secondary",
];
const inputStyleSizes: InputProps["styleSize"][] = ["sm", "md", "lg", "xl"];

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
                    className="flex items-start justify-center gap-6"
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

                {buttonStyleVariants.map((buttonStyleVariant) => (
                  <div
                    className="flex items-start justify-center gap-6"
                    key={buttonStyleVariant}
                  >
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonStyleVariant} Buttons
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonStyleSizes.map((buttonStyleSize, index) => (
                          <Button
                            styleVariant={buttonStyleVariant}
                            styleSize={buttonStyleSize}
                            disabled={index === buttonStyleSizes.length - 1}
                            key={buttonStyleSize}
                          >
                            <span>Learn More</span>
                            <span>&rarr;</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonStyleVariant} Icon
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonStyleSizes.map((buttonStyleSize, index) => (
                          <Button
                            styleVariant={buttonStyleVariant}
                            styleSize={buttonStyleSize}
                            styleType="icon"
                            disabled={index === buttonStyleSizes.length - 1}
                            key={buttonStyleSize}
                          >
                            <Plus />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <h2 className="text-xl font-bold uppercase tracking-wide">
                        {buttonStyleVariant} Stack
                      </h2>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {buttonStyleSizes.map((buttonStyleSize, index) => (
                          <Button
                            styleVariant={buttonStyleVariant}
                            styleSize={buttonStyleSize}
                            styleStack={true}
                            disabled={index === buttonStyleSizes.length - 1}
                            key={buttonStyleSize}
                          >
                            <span>Learn More</span>
                            <span>&rarr;</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

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
                            key={inputStyleSize}
                          >
                            <Search />
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
                            key={inputStyleSize}
                          >
                            <Search />
                          </Input>
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
      <main className="mx-auto flex min-h-dvh max-w-7xl flex-grow flex-col items-center scroll-smooth px-1 py-4 md:px-4 md:py-6">
        <Bonus />
      </main>
    </>
  );
}

export default App;
