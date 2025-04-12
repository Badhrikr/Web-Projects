import isBrowser from "./is-browser";

function getLocalStorageDate(key: string): string {
    if (isBrowser()) {
        let date = localStorage.getItem(key);
        if (date) {
            return date;
        }

        let now = new Date().toString();
        localStorage.setItem(key, now);
        return now;
    }

    return "";
}

export default getLocalStorageDate;