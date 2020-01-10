"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var expression_1 = require("./expression");
// TODO 应该使用 const => babel transform ts have problem
var MathRecordKeyEnum;
(function (MathRecordKeyEnum) {
    MathRecordKeyEnum["itemKey"] = "record-user-do-problem";
})(MathRecordKeyEnum || (MathRecordKeyEnum = {}));
var getCacheLocationProblem = function (name) {
    var cacheProblem = window.localStorage.getItem(name);
    return !cacheProblem ? false : JSON.parse(cacheProblem);
};
var clearCacheLocationProblem = function () { return window.localStorage.clear(); };
var setCacheLocationProblem = function (name, data) {
    return window.localStorage.setItem(name, JSON.stringify(data));
};
exports.applyMiddleware = function (state, dispatch) { return function (action) {
    return new Promise(function (resolve, reject) {
        try {
            // 从action中获取用户answer,当前题目索引
            var userAnswer = action.userAnswer, currentDoProblemId_1 = action.currentDoProblemId;
            // 获取state里面数学表达式集合
            var mathExpression = state.mathExpression;
            // 获取答案是否正确
            var mathAnswerExpression = mathExpression.find(function (v) { return v.problemId === currentDoProblemId_1; });
            var isCorrect = mathAnswerExpression.resultExpression === userAnswer;
            // 存用户题目
            if (getCacheLocationProblem(MathRecordKeyEnum.itemKey)) {
                var cacheData = getCacheLocationProblem(MathRecordKeyEnum.itemKey);
                cacheData.data = __spreadArrays(cacheData.data, [
                    __assign(__assign({}, mathAnswerExpression), { isCorrect: isCorrect })
                ]);
                cacheData.correctArr.push(Number(isCorrect));
                setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData);
            }
            else {
                var cacheData = {
                    data: [__assign(__assign({}, mathAnswerExpression), { isCorrect: isCorrect })],
                    correctArr: [Number(isCorrect)]
                };
                setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData);
            }
            // 获取新题
            var getNewProblem = expression_1.computerMathMap.get(state.mathExpressionType)();
            var enhanceAction = __assign(__assign({}, action), { nextMathExpression: __assign(__assign({}, getNewProblem), { problemId: state.nextAddProblemId, answerMathExpression: '' }) });
            // TODO 返回值？
            resolve(dispatch(enhanceAction));
        }
        catch (e) {
            reject(e);
        }
    });
}; };
