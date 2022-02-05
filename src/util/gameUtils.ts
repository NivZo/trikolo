import { allQuarterValues, CellData, GridData, QuarterData, QuarterValue, RawBoardData } from "./types";
import { splitStringChunksOf4 } from "./utils";

const initialCell: CellData = {
    up: { value: "N", locked: false },
    right: { value: "N", locked: false },
    down: { value: "N", locked: false },
    left: { value: "N", locked: false },
};

export const asQuarterData = (char: string, starter: boolean = false): QuarterData => {
    const value = char in allQuarterValues ? char as QuarterValue : "N";
    return {
        value,
        locked: starter && value !== "N",
    }
}

export const initGrid = (gridHash: string): GridData => {
    return splitStringChunksOf4(gridHash).map(cellHash => mapHashToCellData(cellHash, true));
}

export const mapGridToHash = (grid: GridData): string =>
    grid.reduce(
        (gridHash, cell) => gridHash + mapCellDataToHash(cell),
        "",
    );

export const mapCellDataToHash = (cellData: CellData): string => cellData.up.value + cellData.right.value + cellData.down.value + cellData.left.value;

export const mapHashToCellData = (hash: string, starter: boolean = false): CellData => ({
    up: asQuarterData(hash[0], starter),
    right: asQuarterData(hash[1], starter),
    down: asQuarterData(hash[2], starter),
    left: asQuarterData(hash[3], starter),
})

export const checkVictory = (originalHash: string, solutionHash: string) => {
    return originalHash === solutionHash;
}

export const getNextQuarterValue = (curren: QuarterValue) => {
    switch (curren) {
        case "N": return "0";
        case "0": return "1";
        case "1": return "2";
        case "2": return "N";
    }
}
