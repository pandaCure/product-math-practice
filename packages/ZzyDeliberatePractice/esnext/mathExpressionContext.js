"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const expression_1 = __importDefault(require("./expression"));
const middleware_1 = require("./middleware");
const initMathExpression = {
    addition: {
        addMathExpression: Array(10)
            .fill(1)
            .map((v, i) => {
            return {
                ...expression_1.default(),
                problemId: i,
                answerMathExpression: ''
            };
        }),
        nextAddProblemId: 10,
        currentDoProblemId: 0
    }
};
const mathExpressionReducer = (state, action) => {
    const { addMathExpression } = state.addition;
    switch (action.type) {
        case 'changeMathExpression':
            return {
                ...state,
                addition: {
                    ...state.addition,
                    addMathExpression: addMathExpression.map(v => {
                        if (v.problemId !== action.currentDoProblemId)
                            return v;
                        return {
                            ...v,
                            answerMathExpression: action.answerMathExpression
                        };
                    })
                }
            };
        case 'doNextMathExpression':
            addMathExpression.push(action.nextMathExpression);
            return {
                ...state,
                addition: {
                    ...state.addition,
                    addMathExpression: [...addMathExpression],
                    nextAddProblemId: state.addition.nextAddProblemId + 1,
                    currentDoProblemId: state.addition.currentDoProblemId + 1
                }
            };
        default:
            return state;
    }
};
function createCtx(reducer, initialState) {
    const defaultDispatch = () => initialState;
    const enhanceDispatch = (action) => Promise.resolve(undefined);
    const prefixCls = 'zzy-deliberate-practice';
    const ctx = react_1.createContext({
        state: initialState,
        dispatch: defaultDispatch,
        enhanceDispatch,
        prefixCls
    });
    const Provider = (props) => {
        const [state, dispatch] = react_1.useReducer(reducer, initialState);
        const enhanceDispatch = middleware_1.applyMiddleware(state, dispatch);
        return react_1.default.createElement(ctx.Provider, Object.assign({ value: { state, dispatch, enhanceDispatch, prefixCls } }, props));
    };
    return [ctx, Provider];
}
exports.createCtx = createCtx;
const [MathExpressionContext, MathExpressionContextProvider] = createCtx(mathExpressionReducer, initMathExpression);
exports.MathExpressionContext = MathExpressionContext;
exports.MathExpressionContextProvider = MathExpressionContextProvider;
