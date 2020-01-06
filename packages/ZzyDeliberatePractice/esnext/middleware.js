"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expression_1 = __importDefault(require("./expression"));
// TODO 应该使用 const => babel transform ts have problem
var additionEnum;
(function (additionEnum) {
    additionEnum["itemKey"] = "addition";
})(additionEnum || (additionEnum = {}));
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
            const { addition } = state;
            // 获取答案是否正确
            const mathExpression = addition.addMathExpression.find((v) => v.problemId === currentDoProblemId);
            const isCorrect = mathExpression.resultExpression === userAnswer;
            // 存用户题目
            if (getCacheLocationProblem(additionEnum.itemKey)) {
                const cacheData = getCacheLocationProblem(additionEnum.itemKey);
                cacheData.data = [...cacheData.data, { ...mathExpression, isCorrect }];
                cacheData.correctArr.push(Number(isCorrect));
                setCacheLocationProblem(additionEnum.itemKey, cacheData);
            }
            else {
                const cacheData = {
                    data: [{ ...mathExpression, isCorrect }],
                    correctArr: [Number(isCorrect)]
                };
                setCacheLocationProblem(additionEnum.itemKey, cacheData);
            }
            // 获取新题
            const getNewProblem = expression_1.default();
            const enhanceAction = {
                ...action,
                nextMathExpression: {
                    ...getNewProblem,
                    problemId: state.addition.nextAddProblemId,
                    answerMathExpression: ''
                }
            };
            // TODO 返回值？
            resolve(dispatch(enhanceAction));
            console.log(state);
        }
        catch (e) {
            reject(e);
        }
    });
};
