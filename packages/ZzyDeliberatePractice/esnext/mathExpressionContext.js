"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const expression_1 = require("./expression");
const middleware_1 = require("./middleware");
const initMathExpression = key => {
    const fun = expression_1.computerMathMap.get(key);
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
            .map((v, i) => {
            return {
                ...fun(),
                problemId: i,
                answerMathExpression: ''
            };
        }),
        nextAddProblemId: 10,
        currentDoProblemId: 0,
        mathExpressionType: key
    };
};
const addState = initMathExpression(expression_1.ComputerMathMapEnum.getAddendMathExpression);
const subState = initMathExpression(expression_1.ComputerMathMapEnum.getSubtractionMathExpression);
const mulState = initMathExpression(expression_1.ComputerMathMapEnum.getMultiplicationMathExpression);
const divState = initMathExpression(expression_1.ComputerMathMapEnum.getDivisionMathExpression);
const mathExpressionReducer = (state, action) => {
    const { mathExpression } = state;
    switch (action.type) {
        case 'changeMathExpression':
            return {
                ...state,
                mathExpression: mathExpression.map(v => {
                    if (v.problemId !== action.currentDoProblemId)
                        return v;
                    return {
                        ...v,
                        answerMathExpression: action.answerMathExpression
                    };
                })
            };
        case 'doNextMathExpression':
            mathExpression.push(action.nextMathExpression);
            return {
                ...state,
                mathExpression: [...mathExpression],
                nextAddProblemId: state.nextAddProblemId + 1,
                currentDoProblemId: state.currentDoProblemId + 1
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
        const [state, dispatch] = react_1.useReducer(reducer, props.initialPropsState);
        const enhanceDispatch = middleware_1.applyMiddleware(state, dispatch);
        return (react_1.default.createElement(ctx.Provider, Object.assign({ value: { state, dispatch, enhanceDispatch, prefixCls } }, props)));
    };
    return [ctx, Provider];
}
exports.createCtx = createCtx;
const [MathExpressionContext, MathExpressionContextProvider] = createCtx(mathExpressionReducer, subState);
exports.MathExpressionContext = MathExpressionContext;
exports.MathExpressionContextProvider = MathExpressionContextProvider;
const stateMap = new Map();
exports.stateMap = stateMap;
stateMap.set('subState', subState);
stateMap.set('addState', addState);
stateMap.set('addState', addState);
stateMap.set('divState', divState);
