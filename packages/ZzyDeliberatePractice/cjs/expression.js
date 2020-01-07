"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRandom = function (minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
var getAddendMathExpression = function () {
    var num1Tens = getRandom(1, 8);
    var num1Ones = getRandom(1, 8);
    var num2Tens = getRandom(1, 9 - num1Tens);
    var num2Ones = getRandom(1, 9 - num1Ones);
    var addend1 = num1Tens * 10 + num1Ones;
    var addend2 = num2Tens * 10 + num2Ones;
    var result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result: result,
        expression: addend1 + "+" + addend2 + "=",
        resultExpression: "" + result
    };
};
var getSubtractionMathExpression = function () {
    var num1Tens = getRandom(2, 9);
    var num1Ones = getRandom(2, 9);
    var num2Tens = getRandom(1, num1Tens);
    var num2Ones = getRandom(1, num1Ones);
    var sub1 = num1Tens * 10 + num1Ones;
    var sub2 = num2Tens * 10 + num2Ones;
    var result = sub1 - sub2;
    return {
        firstNumber: sub1,
        secondNumber: sub2,
        result: result,
        resultExpression: "" + result,
        expression: sub1 + "-" + sub2 + "="
    };
};
var getMultiplicationMathExpression = function () {
    var num1Ones = getRandom(1, 9);
    var num2Ones = getRandom(1, 9);
    var result = num1Ones * num2Ones;
    return {
        firstNumber: num1Ones,
        secondNumber: num2Ones,
        result: result,
        resultExpression: "" + result,
        expression: num1Ones + "\\times" + num2Ones + "="
    };
};
var getDivisionMathExpression = function () {
    var result = getRandom(1, 9);
    var num2Ones = getRandom(1, 9);
    var num1Ones = result * num2Ones;
    return {
        firstNumber: num1Ones,
        secondNumber: num2Ones,
        result: result,
        resultExpression: "" + result,
        expression: num1Ones + "\\div" + num2Ones + "="
    };
};
var computerMathMap = new Map();
exports.computerMathMap = computerMathMap;
computerMathMap.set('getAddendMathExpression', getAddendMathExpression);
computerMathMap.set('getSubtractionMathExpression', getSubtractionMathExpression);
computerMathMap.set('getMultiplicationMathExpression', getMultiplicationMathExpression);
computerMathMap.set('getDivisionMathExpression', getDivisionMathExpression);
var ComputerMathMapEnum;
(function (ComputerMathMapEnum) {
    ComputerMathMapEnum["getAddendMathExpression"] = "getAddendMathExpression";
    ComputerMathMapEnum["getSubtractionMathExpression"] = "getSubtractionMathExpression";
    ComputerMathMapEnum["getMultiplicationMathExpression"] = "getMultiplicationMathExpression";
    ComputerMathMapEnum["getDivisionMathExpression"] = "getDivisionMathExpression";
})(ComputerMathMapEnum || (ComputerMathMapEnum = {}));
exports.ComputerMathMapEnum = ComputerMathMapEnum;
