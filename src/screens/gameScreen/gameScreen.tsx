import React from "react";
import { Grid } from "../../components/grid/grid";
import "./gameScreen.scss";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { joinClassesConditionally } from "../../util/utils";
import { checkVictory, initGrid, mapGridToHash } from "../../util/gameUtils";
import { getRandomHash } from "../../util/fileUtils";
import { RawBoardData } from "../../util/types";
import { GameContextProvider } from "../../components/context/gameContext";
import { AppContext } from "../../components/context/appContext";
import { Fade } from "../../components/fade/fade";
import { homeIcon, moonIcon, nextIcon, restartIcon, soundOffIcon, soundOnIcon, sunIcon } from "../../assets/icons/fontIcons";
import { Timer } from "../../components/timer/timer";

type GameScreenProps = {
    height: number,
    width: number,
}

const GameScreen: React.FC<GameScreenProps> = ({
    height,
    width,
}) => {
    const { setPage, isDarkMode, toggleDarkMode, isMuted, toggleMute } = React.useContext(AppContext);
    const [victory, setVictory] = React.useState(false);

    const rawBoardData: RawBoardData = React.useMemo(() => getRandomHash(height, width), [victory, height, width]);
    const [gridData, setGridData] = React.useState(initGrid(rawBoardData.original));

    React.useEffect(
        () => {
            if (!victory) {
                setGridData(initGrid(rawBoardData.original));
            }
        },
        [victory, rawBoardData.original],
    )

    React.useEffect(
        () => {
            if (checkVictory(mapGridToHash(gridData), rawBoardData.solution)) {
                setVictory(true);
            }
        },
        [gridData, rawBoardData],
    )

    return <Fade>
        <GameContextProvider value={{
            victory,
            score: 0,
            time: 0,
        }}>
            <div
                id="game-screen"
                className={joinClassesConditionally([
                    ["screen", true],
                    ["victory", victory],
                ])}
            >
                <Timer isActive={!victory} />
                <Grid height={height} width={width} gridData={gridData} setGridData={setGridData} />

                <div className="grid-buttons-row">
                    <TactileButton
                        className="home-button"
                        onClick={() => setPage("level-selection")}
                    >{homeIcon}
                    </TactileButton>
                    <TactileButton
                        className="grid-reset-button"
                        onClick={() => {
                            if (victory) {
                                setVictory(false);
                            } else {
                                setGridData(initGrid(rawBoardData.original));
                            }
                        }}
                    >
                        {victory ? nextIcon : restartIcon}
                    </TactileButton>
                    <TactileButton
                        className="mute-button"
                        onClick={toggleMute}
                    >
                        {isMuted ? soundOffIcon : soundOnIcon}
                    </TactileButton>
                    <TactileButton
                        className="darkmode-button"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? moonIcon : sunIcon}
                    </TactileButton>
                </div>

            </div >
        </GameContextProvider>
    </Fade>;
}

export default GameScreen;
