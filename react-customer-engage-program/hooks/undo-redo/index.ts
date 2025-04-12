import { useState, useEffect, useCallback } from "react"
import isBrowser from "../../helpers/is-browser";
import { UseUndoRedoProps } from "./model";

function useUndoRedo<T>({ ref, state, setState }: UseUndoRedoProps) {
    const MAX_TRACK_COUNT = 10;
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackerList, setTrackerList] = useState<Array<T>>([state]);

    const undo = useCallback(() => {
        const newPos = trackIndex - 1 < 0 ? 0 : trackIndex - 1;
        setState(trackerList[newPos]);
        setTrackIndex(newPos);
    }, [trackerList, trackIndex])

    const redo = useCallback(() => {
        const newPos = trackIndex + 1 >= trackerList.length ? trackerList.length - 1 : trackIndex + 1;
        setState(trackerList[newPos]);
        setTrackIndex(newPos);
    }, [trackerList, trackIndex])

    const eventListener = (e: KeyboardEvent) => {
        if (/[zZ]/.test(e.key) && e.ctrlKey && !e.shiftKey) {
            undo();
        }

        if ((/[zZ]/.test(e.key) && e.ctrlKey && e.shiftKey) || /[yY]/.test(e.key) && e.ctrlKey) {
            redo();
        }
    }

    const updateState = useCallback((newState: T) => {
        if (trackerList.length <= MAX_TRACK_COUNT) {
            setTrackerList([...trackerList, newState as T]);
            return;
        }
        setTrackerList([...trackerList.slice(1), newState as T]); // Removing 0th index Object if limit exceeds
    }, [trackerList])

    useEffect(() => {
        console.log({ newTrackIndex: trackerList.length - 1 });
        setTrackIndex(trackerList.length - 1);
    }, [trackerList]);

    useEffect(() => {
        if (!isBrowser()) return;

        window.addEventListener("keydown", eventListener);

        return () => {
            window.removeEventListener("keydown", eventListener);
        }
    }, [ref, redo, undo]);

    return [updateState, undo, redo];
}

export default useUndoRedo;