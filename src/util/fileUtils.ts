import { RawBoardData } from "./types";
import boards from "../assets/boards/boards";


export const getRandomHash = (height: number, width: number): RawBoardData => {
    const boardKey = `${height}x${width}`;
    switch (boardKey) {
        case "3x3":
        case "5x5":
        case "7x7":
            const boardCount = boards[boardKey].length;
            const boardIndex = Math.floor(Math.random() * boardCount);
            return boards[boardKey][boardIndex];
    }
    return boards["3x3"][0];
}