import { useCallback, useState } from "react";

export function useSavedState (key, defaultValue) {
    const [ state, setState ] = useState(() => {
        const savedState = localStorage.getItem(key);

        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (e) {}
        }

        if (defaultValue instanceof Function) {
            return defaultValue();
        }

        return defaultValue;
    });

    const setSavedState = useCallback(newState => {
        localStorage.setItem(key, JSON.stringify(newState));

        setState(newState);
    }, [key]);

    return [ state, setSavedState ];
}