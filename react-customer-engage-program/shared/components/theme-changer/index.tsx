import { dark } from "../../../helpers/icons";
import Icon from "../../../ui-components/Icon";
import IconButton from "../../../ui-components/IconButton";

function ThemeChanger() {
  const themeChangeHandler = () => {
    const body = document.querySelector("body");
    if (!body) return;

    if (body.classList.contains("theme-dark")) {
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");
      localStorage.setItem("app-theme", "theme-light");
    } else {
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");
      localStorage.setItem("app-theme", "theme-dark");
    }
  };

  return (
    <IconButton
      size="sm"
      theme="secondary"
      buttonThemeStyle="ghost"
      onClick={themeChangeHandler}
    >
      <Icon icon={dark} size="md" theme="primary" />
    </IconButton>
  );
}

export default ThemeChanger;
