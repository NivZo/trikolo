import React from "react";

type GameContextValue = {
    victory: boolean,
    score: number,
    time: number,
}

const initialContext: GameContextValue = {
    victory: false,
    score: 0,
    time: 0,
}

export const GameContext = React.createContext(initialContext);
export const GameContextProvider = GameContext.Provider;