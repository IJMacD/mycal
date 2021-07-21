import { useEffect, useState } from "react";

export function useVisibilityChange () {
    const [ visible, setVisible ] = useState(document.visibilityState === "visible");

    useEffect(() => {
        function cb () {
            setVisible(document.visibilityState === "visible");
        }

        document.addEventListener("visibilitychange", cb);

        return () => document.removeEventListener("visibilitychange", cb);
    }, []);

    return visible;
}