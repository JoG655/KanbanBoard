import { Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./layouts/Navigation";
import { AnimatePresence } from "framer-motion";
import { TransitionSlide } from "./components/TransitionSlide";
import { Board } from "./pages/Board";
import { Bonus } from "./pages/Bonus";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    const rootSpinner = document.querySelector(
      "#rootSpinner",
    ) as HTMLDivElement;

    if (!rootSpinner) return;

    const animationName = "rootSpinnerFadeOut";

    rootSpinner.setAttribute("data-animation", animationName);

    const controller = new AbortController();

    const { signal } = controller;

    rootSpinner.addEventListener(
      "animationend",
      (e: AnimationEvent) => {
        if (e.target !== rootSpinner || e.animationName !== animationName)
          return;

        rootSpinner.remove();

        controller.abort();
      },
      { signal },
    );
  }, []);
  return (
    <>
      <Navigation />
      <main className="mx-auto flex max-w-7xl animate-fadeIn flex-col items-center scroll-smooth bg-primary-50 p-4 text-primary-800 dark:bg-primary-900 dark:text-primary-50">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              index
              element={
                <TransitionSlide>
                  <Board />
                </TransitionSlide>
              }
            />
            <Route
              path="/bonus"
              element={
                <TransitionSlide>
                  <Bonus />
                </TransitionSlide>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
