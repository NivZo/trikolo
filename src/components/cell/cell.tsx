import React from "react";
import { CellData, Direction, QuarterData } from "../../util/types";
import { getNextQuarterValue } from "../../util/gameUtils";
import { joinClassesConditionally } from "../../util/utils";
import { GameContext } from "../context/gameContext";
import "./cell.scss";
import { AppContext } from "../context/appContext";
import { clickAudio, lockedAudio } from "../../assets/sounds/audio";

type CellProps = {
    id: number,
    className?: string,
    siblings: number,
    isPortrait: boolean,
    cellData: CellData,
    setCellData?: (cellData: CellData) => void,
}

export const Cell: React.FC<CellProps> = ({
    id,
    className,
    siblings,
    isPortrait,
    cellData,
    setCellData,
}) => {
    const cellSize = Math.floor(50 / siblings);
    const margin = 5 / siblings;
    const units = isPortrait ? "vw" : "vh"

    return <div
        className={joinClassesConditionally([
            ["cell-container", true],
            [className!, !!className],
        ])}
        style={{
            margin: `${margin}${units}`,
            height: `${margin + cellSize + margin}${units}`,
            width: `${margin + cellSize + margin}${units}`,
        }}
    >
        <Quarter
            cellId={id}
            direction="up"
            quarterData={cellData.up}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, up: quarterData })
            }
            style={{
                height: `${cellSize / 2}${units}`,
                width: `${cellSize}${units}`,
                margin: `0 0 0 ${margin}${units}`,
            }}
        />
        <Quarter
            cellId={id}
            direction="right"
            quarterData={cellData.right}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, right: quarterData })
            }
            style={{
                height: `${cellSize}${units}`,
                width: `${cellSize / 2}${units}`,
                margin: `${margin}${units} 0 0 ${cellSize / 2 + margin*2}${units}`,
            }}
        />
        <Quarter
            cellId={id}
            direction="down"
            quarterData={cellData.down}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, down: quarterData })
            }
            style={{
                height: `${cellSize / 2}${units}`,
                width: `${cellSize}${units}`,
                margin: `${cellSize / 2 + margin + margin}${units} 0 0 ${margin}${units}`,
            }}
        />
        <Quarter
            cellId={id}
            direction="left"
            quarterData={cellData.left}
            setQuarterData={
                quarterData => !!setCellData && setCellData({ ...cellData, left: quarterData })
            }
            style={{
                height: `${cellSize}${units}`,
                width: `${cellSize / 2}${units}`,
                margin: `${margin}${units} 0 0 0`,
            }}
        />
    </div>
}

type QuarterProps = {
    cellId: number,
    style?: { [key: string]: string | number },
    direction: Direction,
    quarterData: QuarterData,
    setQuarterData?: (quarterValue: QuarterData) => void,
}

const Quarter: React.FC<QuarterProps> = ({
    cellId,
    style,
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
            style={style}
        />
    </div >
}
