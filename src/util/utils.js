"use strict";
exports.__esModule = true;
exports.splitArrayToSubarrays = exports.splitStringChunksOf4 = exports.joinClassesConditionally = exports.joinClasses = void 0;
var joinClasses = function (classNames) { return classNames.join(" "); };
exports.joinClasses = joinClasses;
var joinClassesConditionally = function (conditionedClassNames) {
    return conditionedClassNames
        .filter(function (conditionedClassName) { return conditionedClassName.length >= 2 && conditionedClassName[1]; })
        .map(function (conditionedClassName) { return conditionedClassName[0]; })
        .join(" ");
};
exports.joinClassesConditionally = joinClassesConditionally;
var splitStringChunksOf4 = function (str) {
    var matches = str.match(/.{1,4}/g);
    return matches ? matches : [];
};
exports.splitStringChunksOf4 = splitStringChunksOf4;
var splitArrayToSubarrays = function (array, subarraySize) {
    var result = [];
    while (array.length) {
        result.push(array.splice(0, subarraySize));
    }
    return result;
};
exports.splitArrayToSubarrays = splitArrayToSubarrays;
