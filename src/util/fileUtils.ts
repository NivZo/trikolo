import { RawBoardData } from "./types";
import boards from "../assets/boards/3by3";

const boardCount = boards.length / 2;

export const getRandomHash = (): RawBoardData => {
    const boardIndex = Math.floor(Math.random() * boardCount) * 2;
    const solutionIndex = boardIndex + 1;
    // return {
    //     original: boards[boardIndex],
    //     solution: boards[solutionIndex],
    //     height: 3,
    //     width: 3,
    //     boardIndex,
    // }
    return {
        original: "122N1NNN0NN11N02102N2N0N2N0N01NNN2N10NNN2N10N1NNNN1NN2NNN1NN12NN01N210NNN22N21NNNNNN1N0212NN011N10N2221NN01N0NNNNNN1NNN22N0NN2NN0N20NNN1NNN2N2012NNN200NN12N20NNN0N10NNN0NNNN1200NNNNN12N1NN00NN0N201NNN112NN00NNNNNNNN10N12211NN012210NNN1NN12N0N2N01N2NN0NN10N",
        solution: "1220110202211102102121002201011222010012221001222011021001121201011210211220210212011002122001121002221020120120022101222001122001201201110222012102200101202001200102100012012002210012210000210120102111202001210012010012211020122100201101200221011212011102",
        height: 8,
        width: 8,
        boardIndex: 0,
    }
}