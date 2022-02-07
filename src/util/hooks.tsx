import React from "react";

export const useToggle: (defaultValue?: boolean) => [boolean, () => void] = defaultValue => {
    const [toggleValue, setToggleValue] = React.useState(defaultValue === undefined ? false : defaultValue);
    return [toggleValue, () => setToggleValue(curr => !curr)];
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    React.useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}