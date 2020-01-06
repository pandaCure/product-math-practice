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
var react_1 = __importStar(require("react"));
var zzy_katex_math_1 = __importDefault(require("zzy-katex-math"));
var enhance_mathquill_no_edit_1 = __importDefault(require("enhance-mathquill-no-edit"));
var classnames_1 = __importDefault(require("classnames"));
var mathExpressionContext_1 = require("../mathExpressionContext");
var KatexMathDiv = function (_a) {
    var mathExpression = _a.mathExpression, answerMathExpression = _a.answerMathExpression, changeBorderColor = _a.changeBorderColor;
    var prefixCls = react_1.useContext(mathExpressionContext_1.MathExpressionContext).prefixCls;
    return (react_1.default.createElement("div", { className: prefixCls + "-question" },
        react_1.default.createElement(zzy_katex_math_1.default, { mathExpression: mathExpression, handleKatexError: function () { } }),
        react_1.default.createElement("div", { className: classnames_1.default(prefixCls + "-answer", changeBorderColor ? prefixCls + "-change-border-color" : '') },
            react_1.default.createElement(enhance_mathquill_no_edit_1.default, { mathExpression: answerMathExpression }))));
};
exports.default = KatexMathDiv;
