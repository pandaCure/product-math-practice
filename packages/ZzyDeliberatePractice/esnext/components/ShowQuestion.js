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
const KatexMathDiv_1 = __importDefault(require("./KatexMathDiv"));
const mathExpressionContext_1 = require("../mathExpressionContext");
const classnames_1 = __importDefault(require("classnames"));
const ShowQuestion = () => {
    const { state, prefixCls } = react_1.useContext(mathExpressionContext_1.MathExpressionContext);
    const { addMathExpression, currentDoProblemId } = state.addition;
    const liDOM = react_1.useRef(null);
    const uiDOM = react_1.useRef(null);
    react_1.useEffect(() => {
        if (liDOM.current && uiDOM.current) {
            const { height } = liDOM.current.getBoundingClientRect();
            uiDOM.current.style.transform = `translate3d(0, ${height *
                -currentDoProblemId}px, 0)`;
        }
    }, [currentDoProblemId]);
    return (react_1.default.createElement("div", { className: `${prefixCls}-show-question` },
        react_1.default.createElement("div", { className: `${prefixCls}-question-block` },
            react_1.default.createElement("ul", { className: `${prefixCls}-question-view`, ref: uiDOM }, addMathExpression.map((v, i) => {
                return (react_1.default.createElement("li", { key: i, className: classnames_1.default(currentDoProblemId === i
                        ? `${prefixCls}-change-color`
                        : `${prefixCls}-base-color`, `${prefixCls}-base-item`), ref: liDOM },
                    react_1.default.createElement(KatexMathDiv_1.default, { mathExpression: v.expression, answerMathExpression: v.answerMathExpression, changeBorderColor: currentDoProblemId === i })));
            })))));
};
exports.default = ShowQuestion;