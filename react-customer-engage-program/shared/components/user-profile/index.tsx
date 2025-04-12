import { useKeycloak } from "@react-keycloak/web";
import Image from "next/image";
import { useRef, useState } from "react";
import Ripples from "react-ripples";
import { CSSTransition } from "react-transition-group";
import getAvatar from "../../../helpers/get-avatar";
import useOutsideClick from "../../../hooks/use-outside-click";
import Register from "../../../modules/auth/components/register";
import Button from "../../../ui-components/Button";
import Modal from "../../../ui-components/Modal";
import { ApplicationRoles } from "../../enums";
import UserProfileFlyout from "../user-profile-flyout";

function UserProfile() {
  const { keycloak, initialized } = useKeycloak();

  const [showUserProfileFlyout, setShowUserProfileFlyout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [ref] = useOutsideClick(() => setShowUserProfileFlyout(false), {
    closeOnEsc: true,
  });

  const role = keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
    "roles"
  ][0] as ApplicationRoles;

  const showRegisterToggle = () => {
    setShowRegister(!showRegister);
  };

  const showUserProfileFlyoutToggle = () => {
    setShowUserProfileFlyout(!showUserProfileFlyout);
  };

  return (
    <div ref={ref} id="user-profile-container">
      {initialized && keycloak?.tokenParsed ? (
        <div className="relative flex items-center">
          <Ripples onClick={showUserProfileFlyoutToggle}>
            <div className="cursor-pointer flex justify-center items-center gap-2">
              <Image
                height={35}
                width={35}
                src={getAvatar(role)}
                alt="loading"
              />
              <span className="capitalize text-sm font-semibold text-theme-primary-850">
                {keycloak.tokenParsed?.name}
              </span>
            </div>
          </Ripples>

          <CSSTransition
            in={showUserProfileFlyout}
            timeout={300}
            classNames="fly"
            unmountOnExit
          >
            <div className="absolute -right-2 top-7 z-50 shadow-lg rounded-md p-1">
              <UserProfileFlyout />
            </div>
          </CSSTransition>
        </div>
      ) : (
        <Button
          theme="primary"
          buttonThemeStyle="ghost"
          size="sm"
          onClick={showRegisterToggle}
        >
          Register
        </Button>
      )}

      <Modal isOpen={showRegister} closeOnEsc={true} close={showRegisterToggle}>
        <Register showRegisterToggle={showRegisterToggle} />
      </Modal>
    </div>
  );
}

export default UserProfile;
