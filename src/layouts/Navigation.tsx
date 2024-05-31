import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/theme";
import { useEffect } from "react";
import { NavButton } from "../components/NavButton";
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

  function handleThemeChange() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <nav className="sticky top-0 z-10 flex w-full items-center justify-end gap-4 border-b-2 border-primary-700 bg-primary-200 p-1 text-lg dark:border-primary-300 dark:bg-primary-700">
        <ul className="flex list-none">
          <li>
            <NavButton to="/">Home</NavButton>
          </li>
          <li>
            <NavButton to="/bonus">Bonus</NavButton>
          </li>
        </ul>
        <Switch
          styleVariant={"secondary"}
          styleSize={"xl"}
          styleType={"icon"}
          checkedIcon={<Moon />}
          uncheckedIcon={<Sun />}
          defaultChecked={theme === "dark"}
          onChange={handleThemeChange}
        >
          Theme
        </Switch>
      </nav>
    </>
  );
}
