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
    gridHeight: number,
    gridWidth: number,
    className?: string,
    setCellData?: (cellData: CellData) => void,
}

export const Cell: React.FC<CellProps> = ({
    id,
    className,
    gridHeight,
    gridWidth,
    cellData,
    setCellData,
}) => {
    const suffix = `${gridHeight}x${gridWidth}`
    return <div
        className={joinClassesConditionally([
            ["cell-container", true],
            [`cell-${suffix}`, true],
            [className!, !!className],
        ])}
        id={id.toString()}
    >
        <Quarter
            cellId={id}
            className={`quarter-${suffix}`}
            direction="up"
            quarterData={cellData.up}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, up: quarterData })
            } />
        <Quarter
            cellId={id}
            className={`quarter-${suffix}`}
            direction="right"
            quarterData={cellData.right}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, right: quarterData })
            } />
        <Quarter
            cellId={id}
            className={`quarter-${suffix}`}
            direction="down"
            quarterData={cellData.down}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, down: quarterData })
            } />
        <Quarter
            cellId={id}
            className={`quarter-${suffix}`}
            direction="left"
            quarterData={cellData.left}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, left: quarterData })
            } />
    </div>
}

type QuarterProps = {
    cellId: number,
    direction: Direction,
    quarterData: QuarterData,
    className?: string,
    setQuarterData?: (quarterValue: QuarterData) => void,
}

const Quarter: React.FC<QuarterProps> = ({
    cellId,
    className,
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

    return <div className={joinClassesConditionally([
        ["quarter-container", true],
        [className!, !!className],
    ])}>
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
