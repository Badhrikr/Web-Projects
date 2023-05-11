import { moon, sun } from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React, { useState } from "react";

const ThemeChanger = () => {
  const [themeChanged, setThemeChanged] = useState(false);
  const themeChangeHandler = () => {
    const body = document.querySelector("body");
    if (!body) return;

    if (body.classList.contains("theme-dark")) {
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");
      localStorage.setItem("app-theme", "theme-light");
      setThemeChanged(true);
    } else {
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");
      localStorage.setItem("app-theme", "theme-dark");
      setThemeChanged(false);
    }
  };
  return (
    <>
      <IconButton
        size="md"
        theme="primary"
        buttonThemeStyle="ghost"
        onClick={() => {
          themeChangeHandler();
        }}
      >
        {!themeChanged && (
          <Icon size="md" theme="secondary" icon={sun} iconType="solid" />
        )}
        {themeChanged && (
          <Icon size="md" theme="secondary" icon={moon} iconType="solid" />
        )}
      </IconButton>
    </>
  );
};

export default ThemeChanger;
