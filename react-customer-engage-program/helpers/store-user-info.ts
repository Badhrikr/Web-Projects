import { BasicUserInfo } from "../shared/model";
import isBrowser from "./is-browser";

const key = "user-info";

function storeUserInfo({ firstName, lastName, emailAddress }: BasicUserInfo) {
    if (!isBrowser()) return;
    localStorage.setItem(key, JSON.stringify({ firstName, lastName, emailAddress }));
}

export default storeUserInfo;