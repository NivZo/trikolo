import React from "react";
import { homeIcon } from "../../assets/icons/fontIcons";
import { AppContext } from "../../components/context/appContext";
import { GameContext } from "../../components/context/gameContext";
import { Fade } from "../../components/fade/fade";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { joinClassesConditionally } from "../../util/utils";
import "./scoreScreen.scss";

export const ScoreScreen: React.FC = () => {
    const appContext = React.useContext(AppContext);
    const { score, time } = React.useContext(GameContext);

    const success = <div>
        <b>Well done!!</b>
        <br /><br />
        You finished all 5 boards with <b>{time} seconds left.</b>
        <br />
        Come back tomorrow to try and beat the next daily race!
    </div>

    const failure = <div>
        <b>Whew...</b>
        <br /><br />
        You finished <b>{score} boards</b> within the time limit.
        <br />
        Come back tomorrow to try and beat the next daily race!
    </div>

    return <Fade>
        <div
            id="score-screen"
            className={joinClassesConditionally([
                ["screen", true],
            ])}
        >
            <div className="score-text">
                {score === 5 ? success : failure}
            </div>

            <div className="score-buttons">

                <TactileButton
                    className="home-button"
                    onClick={() => appContext.setPage("level-selection")}
                >{homeIcon}
                </TactileButton>

            </div>
        </div>
    </Fade>
}

export default ScoreScreen;