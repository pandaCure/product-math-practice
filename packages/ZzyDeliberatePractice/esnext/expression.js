"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom = (minNum, maxNum) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
const getAddendMathExpression = () => {
    const num1Tens = getRandom(1, 8);
    const num1Ones = getRandom(1, 8);
    const num2Tens = getRandom(1, 9 - num1Tens);
    const num2Ones = getRandom(1, 9 - num1Ones);
    const addend1 = num1Tens * 10 + num1Ones;
    const addend2 = num2Tens * 10 + num2Ones;
    const result = addend1 + addend2;
    return {
        firstNumber: addend1,
        secondNumber: addend2,
        result,
        expression: `${addend1}+${addend2}=`,
        resultExpression: `${result}`
    };
};
const getSubtractionMathExpression = () => {
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
const getMultiplicationMathExpression = () => {
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
const getDivisionMathExpression = () => {
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
const computerMathMap = new Map();
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
