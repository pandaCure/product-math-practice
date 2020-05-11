"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRandom = function (minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
var getAddendMathExpressionLevel1 = function () {
    var num1 = getRandom(1, 8);
    var num2 = getRandom(1, 8);
    var num3 = getRandom(1, 9 - num1);
    var num4 = getRandom(1, 9 - num2);
    var addend1 = num1 * 10 + num2;
    var addend2 = num3 * 10 + num4;
    var result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result: result,
        expression: addend1 + "+" + addend2 + "=",
        resultExpression: "" + result
    };
};
var getSubtractionMathExpressionLevel1 = function () {
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
var getMultiplicationMathExpressionLevel1 = function () {
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
var getDivisionMathExpressionLevel1 = function () {
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
var getAddendMathExpressionLevel2 = function () {
    var num1 = getRandom(1, 8);
    var num2 = getRandom(2, 8);
    var num3 = getRandom(1, 9 - num1);
    var num4 = getRandom(10 - num2, 9);
    var addend1 = num1 * 10 + num2;
    var addend2 = num3 * 10 + num4;
    var result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result: result,
        expression: addend1 + "+" + addend2 + "=",
        resultExpression: "" + result
    };
};
var getSubtractionMathExpressionLevel2 = function () {
    var num1Tens = getRandom(2, 9);
    var num1Ones = getRandom(0, 8);
    var num2Tens = getRandom(1, num1Tens);
    var num2Ones = getRandom(num1Ones + 1, 9);
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
var getMultiplicationMathExpressionLevel2 = function () {
    var num1Ones = getRandom(1, 4);
    var num1Tens = getRandom(1, 9);
    var num2Ones = getRandom(1, Math.floor(10 / num1Ones));
    var result = (num1Tens * 10 + num1Ones) * num2Ones;
    var value = num1Tens * 10 + num1Ones;
    return {
        firstNumber: value,
        secondNumber: num2Ones,
        result: result,
        resultExpression: "" + result,
        expression: value + "\\times" + num2Ones + "="
    };
};
var getDivisionMathExpressionLevel2 = function () {
    var num2Ones = getRandom(2, 4);
    var result1Tens = getRandom(1, Math.floor(10 / num2Ones));
    var result1Ones = getRandom(1, Math.floor(10 / num2Ones));
    var result = result1Tens * 10 + result1Ones;
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
computerMathMap.set('getAddendMathExpressionLevel1', getAddendMathExpressionLevel1);
computerMathMap.set('getSubtractionMathExpressionLevel1', getSubtractionMathExpressionLevel1);
computerMathMap.set('getMultiplicationMathExpressionLevel1', getMultiplicationMathExpressionLevel1);
computerMathMap.set('getDivisionMathExpressionLevel1', getDivisionMathExpressionLevel1);
computerMathMap.set('getAddendMathExpressionLevel2', getAddendMathExpressionLevel2);
computerMathMap.set('getSubtractionMathExpressionLevel2', getSubtractionMathExpressionLevel2);
computerMathMap.set('getMultiplicationMathExpressionLevel2', getMultiplicationMathExpressionLevel2);
computerMathMap.set('getDivisionMathExpressionLevel2', getDivisionMathExpressionLevel2);
var ComputerMathMapEnum;
(function (ComputerMathMapEnum) {
    ComputerMathMapEnum["getAddendMathExpressionLevel1"] = "getAddendMathExpressionLevel1";
    ComputerMathMapEnum["getSubtractionMathExpressionLevel1"] = "getSubtractionMathExpressionLevel1";
    ComputerMathMapEnum["getMultiplicationMathExpressionLevel1"] = "getMultiplicationMathExpressionLevel1";
    ComputerMathMapEnum["getDivisionMathExpressionLevel1"] = "getDivisionMathExpressionLevel1";
    ComputerMathMapEnum["getAddendMathExpressionLevel2"] = "getAddendMathExpressionLevel2";
    ComputerMathMapEnum["getSubtractionMathExpressionLevel2"] = "getSubtractionMathExpressionLevel2";
    ComputerMathMapEnum["getMultiplicationMathExpressionLevel2"] = "getMultiplicationMathExpressionLevel2";
    ComputerMathMapEnum["getDivisionMathExpressionLevel2"] = "getDivisionMathExpressionLevel2";
})(ComputerMathMapEnum || (ComputerMathMapEnum = {}));
exports.ComputerMathMapEnum = ComputerMathMapEnum;
