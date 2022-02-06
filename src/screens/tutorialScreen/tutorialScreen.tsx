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
    gridHash: string,
    gridHeight: number,
    gridWidth: number,
    text: TutorialText[][],
    advanceCheck: (gridHash: string) => boolean,
};

const Colored: React.FC = ({ children }) => <span className="tutorial-text-colored">{children}</span>;

const tutorialGridScript: TutorialStepScript[] = [
    {
        gridHash: "NNNN",
        gridHeight: 1,
        gridWidth: 1,
        text: [
            ["Hey, Welcome to", <b>trikolo!</b>],
            [<br />],
            [<b>trikolo</b>, "is a game of logic puzzles,"],
            ["and I hope you find it relaxing yet challenging!"],
            [<br />],
            ["Please click the button below"],
            ["(", nextIcon, ")"],
            ["to advance and learn the rules."]
        ],
        advanceCheck: () => true,
    },
    {
        gridHash: "21NN",
        gridHeight: 1,
        gridWidth: 1,
        text: [
            ["This is a", <b>cell,</b>, " made of 4 quarters."],
            ["Initial quarters will be", <b>"locked",</b>],
            ["this means they can not be changed."],
            ["GRID"],
            ["You can change the ", <Colored>color</Colored>, " of an empty quarter by ", <b>clicking</b>, " on it.\n\n"],
            [<br />],
            ["There are", <Colored>3 total colors,</Colored>, "which appear in the same order."],
            [<br />],
            ["In order to advance, try changing the ", <Colored>color</Colored>, " of an", <b>empty quarter.</b>],
        ],
        advanceCheck: gridHash => gridHash !== "21NN",
    },
    {
        gridHash: "00NN",
        gridHeight: 1,
        gridWidth: 1,
        text: [
            ["All cells must be ", <Colored>colored,</Colored>, "and all colors ", <b>must be present.</b>],
            ["Since there are 4 quarters and 3 ", <Colored>colors,</Colored>],
            [" one of them must appear on ", <b>two quarters.</b>],
            ["GRID"],
            ["These ", <b>two quarters</b>, " with the same color", <b>must be adjacent.</b>],
            ["Follow the new rules to complete this puzzle and advance."],
        ],
        advanceCheck: gridHash => ["0012", "0021"].includes(gridHash),
    },
    {
        gridHash: "N1102001021N",
        gridHeight: 1,
        gridWidth: 3,
        text: [
            ["The last rule is -", <b>adjacent cells</b>, "share color on their", <b>touching quarters.</b>],
            ["GRID"],
            ["Follow the new rule to complete this puzzle and finish the tutorial."],
        ],
        advanceCheck: gridHash => gridHash === "211020010210",
    },
];

export const TutorialScreen: React.FC = () => {
    const appContext = React.useContext(AppContext);

    const [tutorialStep, setTutorialStep] = React.useState(0);
    const [canAdvance, toggleCanAdvance] = useToggle(false);
    const [gridData, setGridData] = React.useState(initGrid(tutorialGridScript[0].gridHash))

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

    React.useEffect(
        () => {
            setGridData(initGrid(tutorialGridScript[tutorialStep].gridHash))
        },
        [tutorialStep]
    )

    return <Fade key={`tutorial-screen-step-${tutorialStep}`}>
        <div
            id="tutorial-screen"
            className={joinClassesConditionally([
                ["screen", true],
            ])}
        >
            <div className="tutorial-text">
                {tutorialGridScript[tutorialStep].text.map(row => <span className="tutorial-text-row">{
                    row.length > 0 && row[0] === "GRID" ?
                        <Grid height={tutorialGridScript[tutorialStep].gridHeight} width={tutorialGridScript[tutorialStep].gridWidth} gridData={gridData} setGridData={setGridData} />
                        : row
                }</span>)}
            </div>

            <Fade durationFactor={5}>
                <TactileButton
                    className="advance-button"
                    enabled={canAdvance}
                    onClick={() => {
                        if (tutorialStep < tutorialGridScript.length - 1) {
                            setTutorialStep(curr => curr + 1);
                        } else {
                            appContext.setPage("home");
                        }
                    }}
                    children={nextIcon}
                />
            </Fade>

            <TactileButton
                className="home-button"
                onClick={() => appContext.setPage("home")}
                children={homeIcon}
            />
        </div>
    </Fade>
}