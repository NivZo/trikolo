import React from "react";
import { homeIcon, nextIcon } from "../../assets/icons/fontIcons";
import { Cell } from "../../components/cell/cell";
import { AppContext } from "../../components/context/appContext";
import { Fade } from "../../components/fade/fade";
import { Grid } from "../../components/grid/grid";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { initGrid, mapGridToHash } from "../../util/gameUtils";
import { useToggle } from "../../util/hooks";
import { joinClasses, joinClassesConditionally } from "../../util/utils";
import "./tutorialScreen.scss";

type TutorialText = string | JSX.Element;
type TutorialStepScript = {
    gridHash: string,
    gridHeight: number,
    gridWidth: number,
    text: TutorialText[][],
    advanceCheck: (gridHash: string) => boolean,
};

const Colored: React.FC<{ colorIndex?: number }> = ({ children, colorIndex }) => <span
    className={joinClasses([
        "tutorial-text-colored",
        colorIndex !== undefined ? `colored-${colorIndex}` : "colored-1",
    ])}>
    {children}
</span>;

const tutorialGridScript: TutorialStepScript[] = [
    {
        gridHash: "NNNN",
        gridHeight: 1,
        gridWidth: 1,
        text: [
            ["Hey, Welcome to", <b>TRIKOLO!</b>],
            [<br />],
            [<b>TRIKOLO</b>, "is a game of logic puzzles."],
            ["I hope you find it relaxing yet challenging!"],
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
            ["This is a", <b>cell,</b>, " made of 4 triangles."],
            ["Initial triangles will be", <b>"locked",</b>],
            ["this means they can not be changed."],
            ["GRID"],
            ["You can change the ", <Colored>color</Colored>, " of an empty triangle by ", <b>clicking</b>, " it.\n\n"],
            [<br />],
            ["There are", <Colored colorIndex={0}>three (3)</Colored>, <Colored colorIndex={1}>total</Colored>, <Colored colorIndex={2}>colors,</Colored>, "which appear in the same order."],
            ["In order to proceed, try changing the ", <Colored>color</Colored>, " of an", <b>empty triangle.</b>],
        ],
        advanceCheck: gridHash => gridHash !== "21NN",
    },
    {
        gridHash: "00NN",
        gridHeight: 1,
        gridWidth: 1,
        text: [
            ["All cells must be ", <Colored>colored,</Colored>, "and all colors ", <b>must be present.</b>],
            ["Since there are 4 triangles and 3", <Colored>colors,</Colored>],
            ["two triangles must have the", <b>same color.</b>],
            ["GRID"],
            ["These ", <b>two triangles</b>, " with the same color", <b>must be adjacent.</b>],
            ["Follow the new rules to complete this puzzle and proceed."],
        ],
        advanceCheck: gridHash => ["0012", "0021"].includes(gridHash),
    },
    {
        gridHash: "2N102001021N",
        gridHeight: 1,
        gridWidth: 3,
        text: [
            ["The last rule is -", <b>adjacent cells</b>, "share color on their", <b>touching triangles.</b>],
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
                        <Grid
                            height={tutorialGridScript[tutorialStep].gridHeight}
                            width={tutorialGridScript[tutorialStep].gridWidth}
                            gridData={gridData}
                            setGridData={setGridData}
                            tutorialGrid={true}
                        />
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