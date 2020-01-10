"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = require("./expression");
// TODO 应该使用 const => babel transform ts have problem
var MathRecordKeyEnum;
(function (MathRecordKeyEnum) {
    MathRecordKeyEnum["itemKey"] = "record-user-do-problem";
})(MathRecordKeyEnum || (MathRecordKeyEnum = {}));
const getCacheLocationProblem = (name) => {
    const cacheProblem = window.localStorage.getItem(name);
    return !cacheProblem ? false : JSON.parse(cacheProblem);
};
const clearCacheLocationProblem = () => window.localStorage.clear();
const setCacheLocationProblem = (name, data) => {
    return window.localStorage.setItem(name, JSON.stringify(data));
};
exports.applyMiddleware = (state, dispatch) => (action) => {
    return new Promise((resolve, reject) => {
        try {
            // 从action中获取用户answer,当前题目索引
            const { userAnswer, currentDoProblemId } = action;
            // 获取state里面数学表达式集合
            const { mathExpression } = state;
            // 获取答案是否正确
            const mathAnswerExpression = mathExpression.find((v) => v.problemId === currentDoProblemId);
            const isCorrect = mathAnswerExpression.resultExpression === userAnswer;
            // 存用户题目
            if (getCacheLocationProblem(MathRecordKeyEnum.itemKey)) {
                const cacheData = getCacheLocationProblem(MathRecordKeyEnum.itemKey);
                cacheData.data = [
                    ...cacheData.data,
                    { ...mathAnswerExpression, isCorrect }
                ];
                cacheData.correctArr.push(Number(isCorrect));
                setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData);
            }
            else {
                const cacheData = {
                    data: [{ ...mathAnswerExpression, isCorrect }],
                    correctArr: [Number(isCorrect)]
                };
                setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData);
            }
            // 获取新题
            const getNewProblem = expression_1.computerMathMap.get(state.mathExpressionType)();
            const enhanceAction = {
                ...action,
                nextMathExpression: {
                    ...getNewProblem,
                    problemId: state.nextAddProblemId,
                    answerMathExpression: ''
                }
            };
            // TODO 返回值？
            resolve(dispatch(enhanceAction));
        }
        catch (e) {
            reject(e);
        }
    });
};
