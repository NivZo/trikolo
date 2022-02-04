import { RawBoardData } from "./types";
import boards from "../assets/boards/3by3";

const boardCount = 3000;

export const getRandomHash = (): RawBoardData => {
    const boardIndex = Math.floor(Math.random() * boardCount) * 2;
    const solutionIndex = boardIndex + 1;
    return {
        original: boards[boardIndex],
        solution: boards[solutionIndex],
    }
}