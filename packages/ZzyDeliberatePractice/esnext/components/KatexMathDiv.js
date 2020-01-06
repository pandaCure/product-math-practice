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
const zzy_katex_math_1 = __importDefault(require("zzy-katex-math"));
const enhance_mathquill_no_edit_1 = __importDefault(require("enhance-mathquill-no-edit"));
const classnames_1 = __importDefault(require("classnames"));
const mathExpressionContext_1 = require("../mathExpressionContext");
const KatexMathDiv = ({ mathExpression, answerMathExpression, changeBorderColor }) => {
    const { prefixCls } = react_1.useContext(mathExpressionContext_1.MathExpressionContext);
    return (react_1.default.createElement("div", { className: `${prefixCls}-question` },
        react_1.default.createElement(zzy_katex_math_1.default, { mathExpression: mathExpression, handleKatexError: () => { } }),
        react_1.default.createElement("div", { className: classnames_1.default(`${prefixCls}-answer`, changeBorderColor ? `${prefixCls}-change-border-color` : '') },
            react_1.default.createElement(enhance_mathquill_no_edit_1.default, { mathExpression: answerMathExpression }))));
};
exports.default = KatexMathDiv;
