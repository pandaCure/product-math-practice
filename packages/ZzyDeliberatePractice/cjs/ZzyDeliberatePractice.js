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
var PrimaryKeyBoard_1 = __importDefault(require("./components/PrimaryKeyBoard"));
var mathExpressionContext_1 = require("./mathExpressionContext");
var ShowQuestion_1 = __importDefault(require("./components/ShowQuestion"));
var ZzyDeliberatePractice = function (_a) {
    var types = _a.types;
    // TODO 进场图片加载动画需要吗
    var prefixCls = react_1.useContext(mathExpressionContext_1.MathExpressionContext).prefixCls;
    return (react_1.default.createElement(mathExpressionContext_1.MathExpressionContextProvider, { initialPropsState: mathExpressionContext_1.stateMap.get(types)() },
        react_1.default.createElement("div", { className: prefixCls + "-container" },
            react_1.default.createElement(ShowQuestion_1.default, null),
            react_1.default.createElement(PrimaryKeyBoard_1.default, null))));
};
exports.default = ZzyDeliberatePractice;
