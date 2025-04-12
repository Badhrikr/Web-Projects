import { useKeycloak } from "@react-keycloak/web";
import Image from "next/image";
import getAvatar from "../../../helpers/get-avatar";
import Button from "../../../ui-components/Button";
import { ApplicationRoles } from "../../enums";

function UserProfileFlyout() {
  const { keycloak } = useKeycloak();

  const role = keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
    "roles"
  ][0] as ApplicationRoles;

  const logoutHandler = () => {
    keycloak.logout({
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center w-[250px] bg-theme-background-popup px-2 py-4 rounded-md">
      <div>
        <Image height={47} width={47} src={getAvatar(role)} alt="loading" />
      </div>

      <div className="text-center">
        <h4 className="text-theme-secondary-800 text-base font-semibold">
          {keycloak.tokenParsed?.name}
        </h4>
        <h4 className="text-theme-secondary text-sm">
          {keycloak.tokenParsed?.email}
        </h4>
      </div>

      <Button
        onClick={logoutHandler}
        theme="secondary"
        buttonThemeStyle="ghost"
        size="sm"
      >
        <span className="font-semibold">Logout</span>
      </Button>
    </div>
  );
}

export default UserProfileFlyout;
