import boards from "./3by3"
import * as fs from "fs";
import { splitArrayToSubarrays } from "../../util/utils";

const boardCouples = splitArrayToSubarrays(boards, 2).filter(([b1, b2]) => !b2.includes("N")).map(([b1, b2]) => `\"${b1}\"\n\"${b2}\"`);
const boardsString = boardCouples.join("\n");

fs.writeFileSync("3by3valid.boards", boardsString, "utf-8");