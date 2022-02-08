import React from "react";
import { Grid } from "../../components/grid/grid";
import "./challengeScreen.scss";
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

const ChallengeScreen: React.FC<GameScreenProps> = ({
    height,
    width,
}) => {
    const { setPage, isDarkMode, toggleDarkMode, isMuted, toggleMute } = React.useContext(AppContext);
    const [victory, setVictory] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(300);

    const rawBoardData: RawBoardData = React.useMemo(() => getRandomHash(height, width), [height, width, score]);
    const [gridData, setGridData] = React.useState(initGrid(rawBoardData.original));

    React.useEffect(
        () => {
            if (!victory) {
                setGridData(initGrid(rawBoardData.original));
            }
        },
        [victory, score, rawBoardData.original],
    );

    React.useEffect(
        () => {
            if (checkVictory(mapGridToHash(gridData), rawBoardData.solution)) {
                setScore(curr => curr + 1);
            }
        },
        [gridData, rawBoardData.original],
    );

    return <Fade>
        <GameContextProvider value={{
            victory,
            score,
            time: 0,
        }}>
            <div
                id="challenge-screen"
                className={joinClassesConditionally([
                    ["screen", true],
                    ["victory", victory],
                ])}
            >
                <div className="score-counter" >
                    Finished : {score} / 5
                </div>
                <Timer
                    isActive={!victory && score < 5}
                    stopwatch={{
                        seconds: 300,
                        onFinish: (timeLeft) => {
                            setTimeLeft(timeLeft);
                            setVictory(true);
                        },
                    }}
                />
                <Grid height={height} width={width} gridData={gridData} setGridData={setGridData} />

                <div className="grid-buttons-row">
                    <TactileButton
                        className="home-button"
                        onClick={() => setPage("home")}
                    >{homeIcon}
                    </TactileButton>
                    <TactileButton
                        className="grid-reset-button"
                        onClick={() => {
                            if (victory) {
                                setPage("challenge-score")
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

export default ChallengeScreen;
