import { Spinner, type SpinnerProps } from "../../components/Spinner";

const spinnerAnimationCounts: SpinnerProps["animationCount"][] = [
  1, 2, 3, 4, 5,
];

export function DemoSpinner() {
  return (
    <div className="flex items-start justify-center gap-6">
      <div className="grid gap-2">
        <h2 className="text-xl font-bold uppercase tracking-wide">Spinner</h2>
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
        <h2 className="text-xl font-bold uppercase tracking-wide">
          Text Spinner
        </h2>
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
  );
}
