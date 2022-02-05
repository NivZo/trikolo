import React from "react";

export const useToggle: (defaultValue?: boolean) => [boolean, () => void] = defaultValue => {
    const [toggleValue, setToggleValue] = React.useState(defaultValue === undefined ? false : defaultValue);
    return [toggleValue, () => setToggleValue(curr => !curr)];
}