import { Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./layouts/Navigation";
import { AnimatePresence } from "framer-motion";
import { TransitionSlide } from "./components/TransitionSlide";
import { Home } from "./pages/Home";
import { Bonus } from "./pages/Bonus";

function App() {
  const location = useLocation();
  return (
    <>
      <Navigation />
      <main className="mx-auto flex max-w-7xl flex-grow flex-col items-center scroll-smooth px-1 py-4 md:px-4 md:py-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              index
              element={
                <TransitionSlide>
                  <Home />
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
