import { useEffect } from "react";
import isBrowser from "../../helpers/is-browser";

function useKeydown(eventListener: (e: KeyboardEvent) => void) {
    useEffect(() => {
        if (!isBrowser()) return;

        window.addEventListener("keydown", eventListener);

        return () => {
            window.removeEventListener("keydown", eventListener);
        }
    }, []);
}

export default useKeydown;