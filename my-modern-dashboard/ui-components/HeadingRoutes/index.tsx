import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import { HeadingRoutesProps } from "./model";
import Icon from "../Icon";
import { chevron_down } from "../../helpers/icons";
import { CSSTransition } from "react-transition-group";
import useOutsideClick from "../../hooks/use-outside-click";

function HeadingRoutes({ routes }: HeadingRoutesProps) {
  const router = useRouter();

  const [showRoutes, setShowRoutes] = useState(false);

  const [ref] = useOutsideClick(() => setShowRoutes(false), {
    closeOnEsc: true,
  });

  const activeRoute = useMemo(() => {
    for (const route of routes) {
      if (route.routerLink === router.pathname) {
        return route;
      }
    }
    return null;
  }, [router.asPath]);

  return activeRoute ? (
    <div className="w-full mb-2">
      <div className="relative group w-fit" ref={ref}>
        <div
          onClick={() => setShowRoutes(!showRoutes)}
          className="w-fit cursor-pointer hover:bg-theme-background-elevate flex gap-2 items-center"
        >
          <div className="flex items-center gap-1">
            {activeRoute?.routerIcon}
            <h1 className="font-secondary font-semibold text-lg text-theme-secondary py-2">
              {activeRoute?.routerText}
            </h1>
          </div>

          <div
            style={{ opacity: showRoutes ? "100" : "0" }}
            className="opacity-0 group-hover:!opacity-100"
          >
            <Icon icon={chevron_down} size="sm" theme="secondary" />
          </div>
        </div>

        <CSSTransition
          in={showRoutes}
          timeout={150}
          classNames="fly"
          unmountOnExit
        >
          <div className="font-primary absolute z-40 bg-theme-background-popup p-5 rounded-lg shadow-lg flex flex-col gap-4">
            {routes.map(({ routerLink, routerText, routerIcon }, key) => (
              <div
                key={key}
                className="cursor-pointer text-theme-secondary whitespace-nowrap flex gap-2"
                onClick={() => router.push(routerLink)}
              >
                <span>{routerIcon}</span>
                <span>{routerText}</span>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default HeadingRoutes;
