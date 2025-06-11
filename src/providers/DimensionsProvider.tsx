import gsap from "gsap";
import React from "react";
import { debounce } from 'underscore';

type DimensionsContextType = {
    width: number;
    height: number;
};

const DimensionsContext = React.createContext<DimensionsContextType>(null!);

export default function DimensionsProvider(props: { children: React.ReactNode }) {

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    React.useEffect(() => {
        // prevents flashing
        gsap.to("body", { css: { visibility: "visible" }, duration: 0 });
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }, 1000);

        window.addEventListener("resize", debouncedHandleResize);
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

    return (
        <DimensionsContext.Provider value={{ ...dimensions }} children={props.children} />
    );
}

export function useDimensions() {
    return React.useContext(DimensionsContext);
}
