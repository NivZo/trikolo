"use strict";
exports.__esModule = true;
var _3by3_1 = require("./3by3");
var fs = require("fs");
var utils_1 = require("../../util/utils");
var boardCouples = utils_1.splitArrayToSubarrays(_3by3_1["default"], 2).filter(function (_a) {
    var b1 = _a[0], b2 = _a[1];
    return !b2.includes("N");
}).map(function (_a) {
    var b1 = _a[0], b2 = _a[1];
    return "\"" + b1 + "\"\n\"" + b2 + "\"";
});
var boardsString = boardCouples.join("\n");
fs.writeFileSync("3by3valid.boards", boardsString, "utf-8");
