import React, { Dispatch, SetStateAction } from "react";
import { CellData, Direction, QuarterData } from "../../util/types";
import { getNextQuarterValue } from "../../util/gameUtils";
import { joinClassesConditionally } from "../../util/utils";
import { GameContext } from "../context/gameContext";
import "./cell.scss";
import { AppContext } from "../context/appContext";
import { clickAudio, lockedAudio } from "../../assets/sounds/audio";

type CellProps = {
    id: number,
    cellData: CellData,
    setCellData?: (cellData: CellData) => void,
}

export const Cell: React.FC<CellProps> = ({
    id,
    cellData,
    setCellData,
}) => {

    return <div className="cell-container">
        {/* <div className={`cell-back ${!!isTopRow ? "cell-top-row" : ""} ${!!isTopRow && isHover ? "cell-back-hover" : ""}`} /> */}
        <div className="cell-front" id={id.toString()}>
            <Quarter
                // {...(!!isTopRow ? {onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false)} : {})}
                cellId={id}
                direction="up"
                quarterData={cellData.up}
                setQuarterData={
                    quarterData => !!setCellData && setCellData({ ...cellData, up: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="right"
                quarterData={cellData.right}
                setQuarterData={
                    quarterData => !!setCellData && setCellData({ ...cellData, right: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="down"
                quarterData={cellData.down}
                setQuarterData={
                    quarterData => !!setCellData && setCellData({ ...cellData, down: quarterData })
                } />
            <Quarter
                cellId={id}
                direction="left"
                quarterData={cellData.left}
                setQuarterData={
                    quarterData => !!setCellData && setCellData({ ...cellData, left: quarterData })
                } />
        </div>
    </div>
}

type QuarterProps = {
    cellId: number,
    direction: Direction,
    quarterData: QuarterData,
    setQuarterData?: (quarterValue: QuarterData) => void,
}

const Quarter: React.FC<QuarterProps> = ({
    cellId,
    direction,
    quarterData,
    setQuarterData,
}) => {
    const gameContext = React.useContext(GameContext);
    const appContext = React.useContext(AppContext);

    const quarterId = `quarter-${cellId}-${direction}`;
    const clickable = !gameContext.victory;
    const soundable = !appContext.isMuted

    const onClick = () => {
        if (!!setQuarterData && !quarterData.locked) {
            setQuarterData({
                ...quarterData,
                value: getNextQuarterValue(quarterData.value),
            });
            if (soundable) {
                clickAudio.load();
                clickAudio.play();
            }
        } else {
            if (soundable) {
                lockedAudio.load();
                lockedAudio.play();
            }
        }
    };

    return <div className="quarter-container">
        <div
            onTouchEnd={() => document.getElementById(quarterId)?.blur()}
            id={quarterId}
            className={joinClassesConditionally([
                [`quarter quarter-${direction} quarter-front quarter-${quarterData.value}`, true],
                ["quarter-locked", quarterData.locked && clickable],
                ["quarter-unlocked", !quarterData.locked && clickable],
            ])}
            onClick={onClick}
        />
    </div >
}
