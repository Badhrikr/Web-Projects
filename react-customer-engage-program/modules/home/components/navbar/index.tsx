import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { hamburger, monitor, phone } from "../../../../helpers/icons";
import useOutsideClick from "../../../../hooks/use-outside-click";
import GlobalSearchbar from "../../../../shared/components/global-searchbar";
import Menu from "../../../../shared/components/menu";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";

function Navbar() {
  const router = useRouter();
  const { keycloak } = useKeycloak();

  const [showMenu, setShowMenu] = useState(false);

  const [menuContainerRef] = useOutsideClick(
    () => {
      setShowMenu(false);
    },
    { closeOnEsc: true }
  );

  const toggleMenu = () => {
    setShowMenu((menu) => !menu);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [router.asPath]);

  return (
    <nav className="bg-theme-background-nav py-2 px-4 flex justify-between items-center relative">
      <div>
        <IconButton
          onClick={toggleMenu}
          size="md"
          theme="primary"
          buttonThemeStyle="ghost"
          className="toggle-button"
        >
          <Icon icon={hamburger} size="lg" theme="primary" />
        </IconButton>
      </div>

      <CSSTransition
        in={showMenu}
        unmountOnExit
        timeout={300}
        classNames="slide-left-right"
      >
        <div ref={menuContainerRef} className="flex fixed z-50 left-0 top-[3.75rem] bottom-0">
          <Menu close={toggleMenu} />
        </div>
      </CSSTransition>

      <div className="flex-1 px-4 lg:px-[3.4rem]">
        <GlobalSearchbar />
      </div>

      <div className="flex gap-2 items-center">
        {!keycloak?.authenticated && (
          <>
            <Button
              onClick={() => router.push("/create-demo-request")}
              buttonThemeStyle="ghost"
              size="sm"
              theme="primary"
            >
              <div className="flex-center-center">
                <Icon icon={monitor} size="sm" theme="primary" />
                <span> Request for demo</span>
              </div>
            </Button>

            <Button
              onClick={() => router.push("/create-callback-request")}
              buttonThemeStyle="ghost"
              size="sm"
              theme="primary"
            >
              <div className="flex-center-center">
                <Icon icon={phone} size="sm" theme="primary" />
                <span>Request for callback</span>
              </div>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
