"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom = (minNum, maxNum) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
const getAddendMathExpressionLevel1 = () => {
    const num1 = getRandom(1, 8);
    const num2 = getRandom(1, 8);
    const num3 = getRandom(1, 9 - num1);
    const num4 = getRandom(1, 9 - num2);
    const addend1 = num1 * 10 + num2;
    const addend2 = num3 * 10 + num4;
    const result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result,
        expression: `${addend1}+${addend2}=`,
        resultExpression: `${result}`
    };
};
const getSubtractionMathExpressionLevel1 = () => {
    const num1Tens = getRandom(2, 9);
    const num1Ones = getRandom(2, 9);
    const num2Tens = getRandom(1, num1Tens);
    const num2Ones = getRandom(1, num1Ones);
    const sub1 = num1Tens * 10 + num1Ones;
    const sub2 = num2Tens * 10 + num2Ones;
    const result = sub1 - sub2;
    return {
        firstNumber: sub1,
        secondNumber: sub2,
        result,
        resultExpression: `${result}`,
        expression: `${sub1}-${sub2}`
    };
};
const getMultiplicationMathExpressionLevel1 = () => {
    const num1Ones = getRandom(1, 9);
    const num2Ones = getRandom(1, 9);
    const result = num1Ones * num2Ones;
    return {
        firstNumber: num1Ones,
        secondNumber: num2Ones,
        result,
        resultExpression: `${result}`,
        expression: `${num1Ones}\\times${num2Ones}`
    };
};
const getDivisionMathExpressionLevel1 = () => {
    const result = getRandom(1, 9);
    const num2Ones = getRandom(1, 9);
    const num1Ones = result * num2Ones;
    return {
        firstNumber: num1Ones,
        secondNumber: num2Ones,
        result,
        resultExpression: `${result}`,
        expression: `${num1Ones}\\div${num2Ones}`
    };
};
const getAddendMathExpressionLevel2 = () => {
    const num1 = getRandom(1, 8);
    const num2 = getRandom(2, 8);
    const num3 = getRandom(1, 9 - num1);
    const num4 = getRandom(10 - num2, 9);
    const addend1 = num1 * 10 + num2;
    const addend2 = num3 * 10 + num4;
    const result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result,
        expression: `${addend1}+${addend2}=`,
        resultExpression: `${result}`
    };
};
const getSubtractionMathExpressionLevel2 = () => {
    const num1Tens = getRandom(2, 9);
    const num1Ones = getRandom(0, 8);
    const num2Tens = getRandom(1, num1Tens);
    const num2Ones = getRandom(num1Ones + 1, 9);
    const sub1 = num1Tens * 10 + num1Ones;
    const sub2 = num2Tens * 10 + num2Ones;
    const result = sub1 - sub2;
    return {
        firstNumber: sub1,
        secondNumber: sub2,
        result,
        resultExpression: `${result}`,
        expression: `${sub1}-${sub2}`
    };
};
const getMultiplicationMathExpressionLevel2 = () => {
    const num1Ones = getRandom(1, 4);
    const num1Tens = getRandom(1, 9);
    const num2Ones = getRandom(1, Math.floor(10 / num1Ones));
    const result = (num1Tens * 10 + num1Ones) * num2Ones;
    const value = num1Tens * 10 + num1Ones;
    return {
        firstNumber: value,
        secondNumber: num2Ones,
        result,
        resultExpression: `${result}`,
        expression: `${value}\\times${num2Ones}`
    };
};
const getDivisionMathExpressionLevel2 = () => {
    const num2Ones = getRandom(2, 4);
    const result1Tens = getRandom(1, Math.floor(10 / num2Ones));
    const result1Ones = getRandom(1, Math.floor(10 / num2Ones));
    const result = result1Tens * 10 + result1Ones;
    const num1Ones = result * num2Ones;
    return {
        firstNumber: num1Ones,
        secondNumber: num2Ones,
        result,
        resultExpression: `${result}`,
        expression: `${num1Ones}\\div${num2Ones}`
    };
};
const computerMathMap = new Map();
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
