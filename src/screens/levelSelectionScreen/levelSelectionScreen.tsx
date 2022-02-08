import React from "react";
import { AppContext } from "../../components/context/appContext";
import { Fade } from "../../components/fade/fade";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { joinClassesConditionally } from "../../util/utils";
import "./levelSelectionScreen.scss";

export const LevelSelectionScreen: React.FC = () => {
    const appContext = React.useContext(AppContext);

    return <Fade>
        <div
            id="level-selection-screen"
            className={joinClassesConditionally([
                ["screen", true],
            ])}
        >
            <div className="level-selection-buttons">
                
                <TactileButton onClick={() => appContext.setPage("game-easy")}>
                    Easy - 3x3
                </TactileButton>

                <TactileButton onClick={() => appContext.setPage("game-medium")}>
                    Medium - 5x5
                </TactileButton>

                <TactileButton onClick={() => appContext.setPage("game-hard")}>
                    Hard - 7x7
                </TactileButton>

                <TactileButton onClick={() => appContext.setPage("home")}>
                    Back
                </TactileButton>
            </div>
        </div>
    </Fade>
}