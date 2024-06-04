import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";
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

  function handleOnClickReset() {
    initializeBoardStoreDummyData();
  }

  return (
    <>
      <nav className="border-b-2 border-primary-700 bg-primary-200 p-1 text-primary-800 dark:border-primary-300 dark:bg-primary-700 dark:text-primary-50">
        <ul className="flex list-none flex-wrap items-center justify-end">
          <li>
            <NavButton to="/">Home</NavButton>
          </li>
          <li>
            <NavButton to="/bonus">Bonus</NavButton>
          </li>
          <li>
            <Button styleVariant={"secondary"} onClick={handleOnClickReset}>
              Reset
            </Button>
          </li>
          <li>
            <Switch
              styleVariant={"secondary"}
              styleSize={"xl"}
              styleType={"icon"}
              checkedIcon={<Moon />}
              uncheckedIcon={<Sun />}
              defaultChecked={theme === "dark"}
              onChange={handleOnChangeTheme}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
