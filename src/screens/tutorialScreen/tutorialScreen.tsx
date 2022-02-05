import React from "react";
import { homeIcon, nextIcon } from "../../assets/icons/fontIcons";
import { Cell } from "../../components/cell/cell";
import { AppContext } from "../../components/context/appContext";
import { Fade } from "../../components/fade/fade";
import { Grid } from "../../components/grid/grid";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { initGrid, mapGridToHash } from "../../util/gameUtils";
import { useToggle } from "../../util/hooks";
import { joinClassesConditionally } from "../../util/utils";
import "./tutorialScreen.scss";

type TutorialText = string | JSX.Element;
type TutorialStepScript = {
    original: string,
    text: TutorialText | TutorialText[],
    advanceCheck: (gridHash: string) => boolean,
};

const tutorialGridScript: TutorialStepScript[] = [
    {
        original: "NNNN",
        text: [
            <span className="tutorial-text-row">This is an empty <span className="tutorial-text-bold">cell.</span></span>,
            <span className="tutorial-text-row">A <span className="tutorial-text-bold">cell</span> is made of 4 quarters.</span>,
            <br />,
            <span className="tutorial-text-row">You can change the <span className="tutorial-text-colored">color</span> of a quarter by <span className="tutorial-text-bold">clicking</span> on it.</span>,
            <br />,
            <span className="tutorial-text-row">To advance, try changing the <span className="tutorial-text-colored">color</span> of a quarter!</span>
        ],
        advanceCheck: gridHash => gridHash !== "NNNN",
    },
    {
        original: "NNNN",
        text: <span className="tutorial-text-row">All cells must be <span className="tutorial-text-colored">colored</span>.</span>,
        advanceCheck: gridHash => gridHash !== "NNN",
    },
];

export const TutorialScreen: React.FC = () => {
    const appContext = React.useContext(AppContext);

    const [tutorialStep, setTutorialStep] = React.useState(0);
    const [canAdvance, toggleCanAdvance] = useToggle(false);
    const [gridData, setGridData] = React.useState(initGrid(tutorialGridScript[tutorialStep].original))

    React.useEffect(
        () => {
            if (tutorialGridScript[tutorialStep].advanceCheck(mapGridToHash(gridData))) {
                if (!canAdvance) {
                    toggleCanAdvance();
                }
            } else {
                if (canAdvance) {
                    toggleCanAdvance();
                }
            }
        },
        [gridData],
    )

    return <Fade>
        <div
            id="tutorial-screen"
            className={joinClassesConditionally([
                ["screen", true],
            ])}
        >
            <Grid height={1} width={1} gridData={gridData} setGridData={setGridData} />
            <div className="tutorial-text">
                {tutorialGridScript[tutorialStep].text}
            </div>

            <TactileButton
                className="advance-button"
                enabled={canAdvance}
                onClick={() => appContext.setPage("home")}
            >{nextIcon}</TactileButton>

            <TactileButton
                className="home-button"
                onClick={() => appContext.setPage("home")}
            >{homeIcon}</TactileButton>
        </div>
    </Fade>
}