import "./App.css";

import { Bonus } from "./layouts/Bonus/Bonus";

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
