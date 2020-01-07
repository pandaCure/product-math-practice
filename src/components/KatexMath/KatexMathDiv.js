"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var KatexMath_1 = __importDefault(require("./KatexMath"));
var EnhanceMathQuillNoEdit_1 = __importDefault(require("@/components/EnhanceMathQuill/EnhanceMathQuillNoEdit"));
var classnames_1 = __importDefault(require("classnames"));
var KatexMathDiv = function (_a) {
    var mathExpression = _a.mathExpression, answerMathExpression = _a.answerMathExpression, changeBorderColor = _a.changeBorderColor;
    return (react_1.default.createElement("div", { className: "question" },
        react_1.default.createElement(KatexMath_1.default, { mathExpression: mathExpression, handleKatexError: function () { } }),
        react_1.default.createElement("div", { className: classnames_1.default('answer', changeBorderColor ? 'change-border-color' : '') },
            react_1.default.createElement(EnhanceMathQuillNoEdit_1.default, { mathExpression: answerMathExpression }))));
};
exports.default = KatexMathDiv;
