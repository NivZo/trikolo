import React from "react"
import { Direction, CellData, QuarterData } from "../../util/types";
import { getNextQuarterValue } from "../../util/gameUtils";
import "./cell.scss"
import { joinClassesConditionally } from "../../util/utils";

type QuarterProps = {
    cellId: number,
    direction: Direction,
    quarterData: QuarterData,
    setQuarterData: (quarterValue: QuarterData) => void,
}

const Quarter: React.FC<QuarterProps> = ({
    cellId,
    direction,
    quarterData,
    setQuarterData,
}) => {
    const quarterId = `quarter-${cellId}-${direction}`;
    return <div className="quarter-container">
        <div
            onTouchEnd={() => document.getElementById(quarterId)?.blur()}
            id={quarterId}
            className={joinClassesConditionally([
                [`quarter quarter-${direction} quarter-front quarter-${quarterData.value}`, true],
                ["quarter-locked", quarterData.locked],
                ["quarter-unlocked", !quarterData.locked],
            ])}
            onClick={() => {
                if (!quarterData.locked) {
                    setQuarterData({
                        ...quarterData,
                        value: getNextQuarterValue(quarterData.value),
                    });
                }
            }}
        />
    </div >
}

type CellProps = {
    id: number,
    cellData: CellData,
    setCellData: (cellData: CellData) => void
}

export const Cell: React.FC<CellProps> = ({
    id,
    cellData,
    setCellData,
}) => {

    const [isHover, setIsHover] = React.useState<boolean>(false);

    return <div className="cell-container">
        {/* <div className={`cell-back ${!!isTopRow ? "cell-top-row" : ""} ${!!isTopRow && isHover ? "cell-back-hover" : ""}`} /> */}
        <div className="cell-front" id={id.toString()}>
            <Quarter
                // {...(!!isTopRow ? {onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false)} : {})}
                cellId={id}
                direction="up"
                quarterData={cellData.up}
                setQuarterData={
                    quarterData => setCellData({ ...cellData, up: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="right"
                quarterData={cellData.right}
                setQuarterData={
                    quarterData => setCellData({ ...cellData, right: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="down"
                quarterData={cellData.down}
                setQuarterData={
                    quarterData => setCellData({ ...cellData, down: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="left"
                quarterData={cellData.left}
                setQuarterData={
                    quarterData => setCellData({ ...cellData, left: quarterData })
                } />
        </div>
    </div>
}
