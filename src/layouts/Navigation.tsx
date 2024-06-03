import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/theme";
import { useEffect } from "react";
import { initializeBoardStoreDummyData } from "../utils/initializeBoardStoreDummyData";
import { NavButton } from "../components/NavButton";
import { Button } from "../components/Button";
import { Switch } from "../components/Switch";

export function Navigation() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const root = document.querySelector("#root");

    if (!root) return;

    switch (theme) {
      case "light":
        root.classList.remove("dark");
        break;
      case "dark":
        root.classList.add("dark");
        break;
    }
  }, [theme]);

  function handleOnChangeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function handleOnClickInitialize() {
    initializeBoardStoreDummyData();
  }

  return (
    <>
      <nav className="sticky top-0 z-10 flex w-full flex-wrap items-center justify-end gap-4 border-b-2 border-primary-700 bg-primary-200 p-1 text-lg dark:border-primary-300 dark:bg-primary-700">
        <ul className="flex list-none items-center">
          <li>
            <NavButton to="/">Home</NavButton>
          </li>
          <li>
            <NavButton to="/bonus">Bonus</NavButton>
          </li>
        </ul>
        <Button styleVariant={"secondary"} onClick={handleOnClickInitialize}>
          Dummy data
        </Button>
        <Switch
          styleVariant={"secondary"}
          styleSize={"xl"}
          styleType={"icon"}
          checkedIcon={<Moon />}
          uncheckedIcon={<Sun />}
          defaultChecked={theme === "dark"}
          onChange={handleOnChangeTheme}
        >
          Theme
        </Switch>
      </nav>
    </>
  );
}
