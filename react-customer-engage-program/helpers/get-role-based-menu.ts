import { ApplicationRoles } from "../shared/enums";
import roleBasedMenu, { defaultMenu } from "./role-based-menu";

function getRoleBasedMenu(role: ApplicationRoles) {
    return roleBasedMenu?.[role] ?? defaultMenu;
}

export default getRoleBasedMenu;