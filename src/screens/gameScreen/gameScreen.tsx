import React from "react";
import { Grid } from "../../components/grid/grid";
import "./gameScreen.scss";
import "../../fonts/Abel-Regular.ttf";
import { Logo } from "../../components/logo/logo";
import { TactileButton } from "../../components/tactileButton/tactileButton";
import { joinClassesConditionally } from "../../util/utils";
import { checkVictory, initGrid, mapGridToHash } from "../../util/gameUtils";
import { getRandomHash } from "../../util/fileUtils";
import { RawBoardData } from "../../util/types";

const height = 3;
const width = 3;

const GameScreen: React.FC = () => {

  const rawBoardData: RawBoardData = React.useMemo(() => getRandomHash(), []);

  React.useEffect(
    () => {
      if (checkVictory(mapGridToHash(gridData), rawBoardData.solution)) {
        alert("WOW!")
      }
    }
  )

  const [isNightMode, setIsNightMode] = React.useState(false);
  const [gridData, setGridData] = React.useState(initGrid(rawBoardData.original))

  return (
    <div
      className={joinClassesConditionally([
        ["app unselectable-text", true],
        ["nightmode-on", isNightMode]])}
    >
      <Logo />
      <Grid height={height} width={width} gridData={gridData} setGridData={setGridData} />

      <div className="grid-buttons-row">
        <TactileButton
          className="settings-button"
        >
          ☰
        </TactileButton>
        <TactileButton
          onClick={() => setGridData(initGrid(rawBoardData.original))}
          className="grid-reset-button"
        >
          ↻
        </TactileButton>
        <TactileButton
          className="nightmode-button"
          onClick={() => setIsNightMode(current => !current)}
        >{isNightMode ? "🌙" : "🔆"}
        </TactileButton>
      </div>

    </div >
  );
}

export default GameScreen;
