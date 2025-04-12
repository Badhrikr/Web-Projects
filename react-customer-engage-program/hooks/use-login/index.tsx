import { useKeycloak } from "@react-keycloak/web";
import { KeycloakInstance } from "keycloak-js";
import { ApplicationRoles } from "../../shared/enums";

export interface LoggedUserDetails {
  loggedUserDetails: {
    userid: string;
    customerid: string;
  };
}

function useLogin() {
  const { initialized, keycloak } = useKeycloak();

  const roles =
    (keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
      "roles"
    ] as ApplicationRoles[]) ?? [];

  const { name, email } = (keycloak.tokenParsed ?? {}) as any;

  return {
    initialized,
    keycloak,
    roles,
    email,
    name,
    authenticated: keycloak.authenticated,
    userId: (keycloak as KeycloakInstance & LoggedUserDetails)
      ?.loggedUserDetails?.userid,
    customerId: (keycloak as KeycloakInstance & LoggedUserDetails)
      ?.loggedUserDetails?.customerid,
  };
}

export default useLogin;
