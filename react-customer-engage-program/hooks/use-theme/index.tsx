import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState<string>("theme-light");

  useEffect(() => {
    themeChangeHandler();
  }, []);

  const themeChangeHandler = () => {
    const body = document.querySelector("body");
    if (!body) return;

    if (body.classList.contains("theme-dark")) {
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");
      localStorage.setItem("app-theme", "theme-light");
      setTheme("theme-light");
    } else {
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");
      localStorage.setItem("app-theme", "theme-dark");
      setTheme("theme-dark");
    }
  };

  return [theme, themeChangeHandler];
}

export default useTheme;
