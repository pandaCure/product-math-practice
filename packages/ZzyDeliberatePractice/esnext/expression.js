"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom = (minNum, maxNum) => {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
const getAddNum = () => {
    const num1 = getRandom(1, 8);
    const num2 = getRandom(1, 8);
    const num3 = getRandom(1, 9 - num1);
    const num4 = getRandom(1, 9 - num2);
    const addend1 = num1 * 10 + num2;
    const addend2 = num3 * 10 + num4;
    const result = addend1 + addend2;
    return {
        addend1,
        addend2,
        result,
        expression: `${addend1}+${addend2}=`,
        resultExpression: `${result}`
    };
};
exports.default = getAddNum;
