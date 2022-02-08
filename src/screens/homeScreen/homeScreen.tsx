import React from "react";
import { AppContext } from "../../components/context/appContext";
import { Fade } from "../../components/fade/fade";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { joinClassesConditionally } from "../../util/utils";
import "./homeScreen.scss";

export const HomeScreen: React.FC = () => {
    const appContext = React.useContext(AppContext);

    return <Fade>
        <div
            id="home-screen"
            className={joinClassesConditionally([
                ["screen", true],
            ])}
        >
            <div className="home-buttons">

                <TactileButton
                    onClick={() => appContext.setPage("tutorial")}
                >
                    Tutorial
                </TactileButton>

                <TactileButton
                    onClick={() => appContext.setPage("challenge")}
                >
                    Daily Race
                </TactileButton>

                <TactileButton
                    onClick={() => appContext.setPage("level-selection")}
                >
                    Zen Mode
                </TactileButton>
            </div>
        </div>
    </Fade>
}

export default HomeScreen;