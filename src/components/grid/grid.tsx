import React from "react";
import { Cell } from "../cell/cell";
import "./grid.scss";
import { CellData, GridData } from "../../util/types";
import { splitArrayToSubarrays } from "../../util/utils";
import { useWindowDimensions } from "../../util/hooks";

type GridProps = {
    height: number,
    width: number,
    gridData: GridData,
    setGridData: React.Dispatch<React.SetStateAction<GridData>>,
}


export const Grid: React.FC<GridProps> = ({
    height,
    width,
    gridData,
    setGridData,
}) => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const cellArray = gridData.map(
        (cellData, i) => <Cell
            key={`cell-${i}`}
            id={i}
            isPortrait={windowHeight > windowWidth}
            siblings={width}
            cellData={cellData}
            setCellData={(newCellData: CellData) => {
                setGridData((currentBoard: GridData) => {
                    currentBoard[i] = newCellData;
                    return [...currentBoard];
                });
            }}
        />
    )

    return <div
        className="grid"
    >
        {splitArrayToSubarrays(cellArray, width).map((row, i) =>
            <div className="grid-row" key={`row-${i}`}>
                {row}
            </div>)}
    </div>
}