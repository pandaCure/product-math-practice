"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRandom = function (minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
var getAddNum = function () {
    var num1 = getRandom(1, 8);
    var num2 = getRandom(1, 8);
    var num3 = getRandom(1, 9 - num1);
    var num4 = getRandom(1, 9 - num2);
    var addend1 = num1 * 10 + num2;
    var addend2 = num3 * 10 + num4;
    var result = addend1 + addend2;
    return {
        addend1: addend1,
        addend2: addend2,
        result: result,
        expression: addend1 + "+" + addend2 + "=",
        resultExpression: "" + result
    };
};
exports.default = getAddNum;
