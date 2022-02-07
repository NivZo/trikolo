
export type QuarterValue = "N" | "0" | "1" | "2";

export type QuarterData = {
    locked: boolean,
    value: QuarterValue,
}

export type CellData = {
    up: QuarterData,
    right: QuarterData,
    down: QuarterData,
    left: QuarterData,
}

export type Direction = "up" | "right" | "down" | "left";

export type GridData = Array<CellData>

export type RawBoardData = {
    original: string,
    solution: string,
    height: number,
    width: number,
    boardIndex: number,
};

export const allQuarterValues: QuarterValue[] = ["N", "0", "1", "2"];
