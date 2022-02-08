import React, { Dispatch, SetStateAction } from "react";

export type Page = |
    "home" |
    "tutorial" |
    "level-selection" |
    "game-easy" |
    "game-medium" |
    "game-hard" |
    "challenge" |
    "challenge-score"
    ;

type AppContextValue = {
    page: Page,
    setPage: Dispatch<SetStateAction<Page>>,
    isDarkMode: boolean,
    toggleDarkMode: () => void,
    isMuted: boolean,
    toggleMute: () => void,
}

const initialToggle = () => undefined;

const initialContext: AppContextValue = {
    page: "home",
    setPage: initialToggle,
    isDarkMode: false,
    toggleDarkMode: initialToggle,
    isMuted: false,
    toggleMute: initialToggle,
}

export const AppContext = React.createContext(initialContext);
export const AppContextProvider = AppContext.Provider;
