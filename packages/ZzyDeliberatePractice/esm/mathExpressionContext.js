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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var expression_1 = require("./expression");
var middleware_1 = require("./middleware");
var initMathExpression = function (key) {
    var fun = expression_1.computerMathMap.get(key);
    if (!fun)
        return {
            mathExpression: [],
            nextAddProblemId: 0,
            currentDoProblemId: 0,
            mathExpressionType: key
        };
    return {
        mathExpression: Array(10)
            .fill(1)
            .map(function (v, i) {
            return __assign(__assign({}, fun()), { problemId: i, answerMathExpression: '' });
        }),
        nextAddProblemId: 10,
        currentDoProblemId: 0,
        mathExpressionType: key
    };
};
var addState = initMathExpression(expression_1.ComputerMathMapEnum.getAddendMathExpression);
var subState = initMathExpression(expression_1.ComputerMathMapEnum.getSubtractionMathExpression);
var mulState = initMathExpression(expression_1.ComputerMathMapEnum.getMultiplicationMathExpression);
var divState = initMathExpression(expression_1.ComputerMathMapEnum.getDivisionMathExpression);
var mathExpressionReducer = function (state, action) {
    var mathExpression = state.mathExpression;
    switch (action.type) {
        case 'changeMathExpression':
            return __assign(__assign({}, state), { mathExpression: mathExpression.map(function (v) {
                    if (v.problemId !== action.currentDoProblemId)
                        return v;
                    return __assign(__assign({}, v), { answerMathExpression: action.answerMathExpression });
                }) });
        case 'doNextMathExpression':
            mathExpression.push(action.nextMathExpression);
            return __assign(__assign({}, state), { mathExpression: __spreadArrays(mathExpression), nextAddProblemId: state.nextAddProblemId + 1, currentDoProblemId: state.currentDoProblemId + 1 });
        default:
            return state;
    }
};
function createCtx(reducer, initialState) {
    var defaultDispatch = function () { return initialState; };
    var enhanceDispatch = function (action) { return Promise.resolve(undefined); };
    var prefixCls = 'zzy-deliberate-practice';
    var ctx = react_1.createContext({
        state: initialState,
        dispatch: defaultDispatch,
        enhanceDispatch: enhanceDispatch,
        prefixCls: prefixCls
    });
    var Provider = function (props) {
        var _a = react_1.useReducer(reducer, props.initialPropsState), state = _a[0], dispatch = _a[1];
        var enhanceDispatch = middleware_1.applyMiddleware(state, dispatch);
        return (react_1.default.createElement(ctx.Provider, __assign({ value: { state: state, dispatch: dispatch, enhanceDispatch: enhanceDispatch, prefixCls: prefixCls } }, props)));
    };
    return [ctx, Provider];
}
exports.createCtx = createCtx;
var _a = createCtx(mathExpressionReducer, subState), MathExpressionContext = _a[0], MathExpressionContextProvider = _a[1];
exports.MathExpressionContext = MathExpressionContext;
exports.MathExpressionContextProvider = MathExpressionContextProvider;
var stateMap = new Map();
exports.stateMap = stateMap;
stateMap.set('subState', subState);
stateMap.set('addState', addState);
stateMap.set('mulState', mulState);
stateMap.set('divState', divState);
