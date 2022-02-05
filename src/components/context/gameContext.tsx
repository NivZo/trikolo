import React from "react";

type GameContextValue = {
    victory: boolean,
}

const initialContext: GameContextValue = {
    victory: false,
}

export const GameContext = React.createContext(initialContext);
export const GameContextProvider = GameContext.Provider;