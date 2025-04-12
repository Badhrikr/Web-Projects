import { ApplicationRoles } from "../shared/enums";

function getAvatar(role: ApplicationRoles): string {
    let avatar = "";
    if (role === ApplicationRoles.SALES_PERSON) {
        avatar = "/assets/salesperson.svg";
    }
    else if (role === ApplicationRoles.CUSTOMER) {
        avatar = "/assets/customerperson.svg"
    }
    else if (role === ApplicationRoles.ADMIN) {
        avatar = "/assets/adminperson.svg"
    }
    else {
        avatar = "/assets/question-mark.svg";
    }
    return avatar;
}

export default getAvatar;