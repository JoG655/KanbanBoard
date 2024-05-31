import { Spinner, type SpinnerProps } from "../components/Spinner";

const spinnerAnimationCounts: SpinnerProps["animationCount"][] = [
  1, 2, 3, 4, 5,
];

export function DemoSpinner() {
  return (
    <>
      <h1 className="text-2xl font-bold uppercase tracking-wide">Spinner</h1>
      <div className="flex flex-col items-center gap-6">
        <div className="grid gap-2">
          <h2 className="text-lg uppercase tracking-wide">Without Text</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {spinnerAnimationCounts.map((spinnerAnimationCount) => (
              <Spinner
                key={spinnerAnimationCount}
                animationCount={spinnerAnimationCount}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-lg uppercase tracking-wide">With Text</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {spinnerAnimationCounts.map((spinnerAnimationCount) => (
              <Spinner
                key={spinnerAnimationCount}
                animationCount={spinnerAnimationCount}
              >
                Loading...
              </Spinner>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
