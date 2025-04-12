import { useKeycloak } from "@react-keycloak/web";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { cancel } from "../../../helpers/icons";
import isBrowser from "../../../helpers/is-browser";
import Button from "../../../ui-components/Button";
import Icon from "../../../ui-components/Icon";
import IconButton from "../../../ui-components/IconButton";

const key = "cookie-consent";

function CookieConsent() {
  const { initialized } = useKeycloak();
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  const acceptHandler = () => {
    if (!isBrowser()) return;
    localStorage.setItem(key, "true");
    setShowCookieConsent(false);
  };

  useEffect(() => {
    if (!initialized) return;

    let cookieAccepted = localStorage.getItem(key);
    console.log({ cookieAccepted });

    setShowCookieConsent(cookieAccepted !== "true");
  }, [initialized]);

  return (
    <CSSTransition
      in={showCookieConsent}
      timeout={300}
      classNames="slide-up"
      unmountOnExit
    >
      <div className="grid gap-4 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.3)] bg-theme-background-popup font-secondary fixed bottom-0 left-0 right-0 w-full py-4">
        <div className="flex justify-end px-2">
          <IconButton
            size="sm"
            theme="secondary"
            buttonThemeStyle="ghost"
            onClick={() => {
              setShowCookieConsent(false);
            }}
          >
            <Icon icon={cancel} size="sm" theme="secondary" />
          </IconButton>
        </div>

        <div className="grid gap-6 px-10 ">
          <h3 className="font-semibold text-theme-secondary">
            Our website uses cookies to improve your browsing experience and to
            personalize the content and advertising you see. By continuing to
            use our website, you consent to our use of cookies. You can change
            your cookie settings at any time by adjusting your browser settings.
            For more information about cookies and how we use them, please see
            our Privacy Policy.
          </h3>

          <div className="flex justify-center items-center">
            <Button onClick={acceptHandler} size="md" theme="primary">
              Okay, I accept.
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default CookieConsent;
