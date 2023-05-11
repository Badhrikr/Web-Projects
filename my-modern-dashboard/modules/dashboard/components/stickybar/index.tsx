import { bell, information_circle, moon, search, sun } from "@/helpers/icons";
import ThemeChanger from "@/shared/theme-changer";
import Button from "@/ui-components/Button";
import Icon from "@/ui-components/Icon";
import Input from "@/ui-components/Input";
import Link from "next/link";
import React, { useEffect } from "react";

const StickyBar = () => {
  useEffect(() => {
    const theme = localStorage.getItem("app-theme");
    if (theme === "theme-light" || theme === "theme-dark") {
      document.querySelector("body")?.classList.add(theme);
      return;
    }

    document.querySelector("body")?.classList.add("theme-light");
  }, []);

  return (
    <div className="sticky z-50 flex items-center justify-between w-full p-2 rounded-lg top-8 bg-white/10 backdrop-blur-3xl font-primary">
      <div className="text-theme-secondary">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/">Pages</Link> <span>/</span>
          <Link href="/">Main Dashboard</Link>
        </div>
        <h1 className="text-3xl">Main Dashboard</h1>
      </div>
      <div className="flex items-center justify-between max-w-md gap-4 p-2 rounded-full bg-theme-background-secondary">
        <Input
          size="md"
          theme="primary"
          icon={search}
          className="overflow-hidden rounded-full"
          placeholder="Search..."
          inputStyle="ghost"
        />
        <Icon size="md" theme="secondary" icon={bell} />
        <Icon size="md" theme="secondary" icon={information_circle} />
        <ThemeChanger />
        <div className="flex items-center justify-center w-16 rounded-full bg-theme-primary-900 aspect-square">
          <Button size="xs" theme="primary" buttonThemeStyle="ghost">
            AP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyBar;
