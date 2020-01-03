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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var katex_1 = __importDefault(require("katex"));
var core_1 = require("@babel/core");
var generator_1 = __importDefault(require("@babel/generator"));
var classnames_1 = __importDefault(require("classnames"));
var KatexMath = function (_a) {
    var mathExpression = _a.mathExpression, children = _a.children, handleKatexError = _a.handleKatexError, cssClass = _a.cssClass, traverseOpts = _a.traverseOpts, reset = __rest(_a, ["mathExpression", "children", "handleKatexError", "cssClass", "traverseOpts"]);
    var katexRenderString = react_1.useMemo(function () {
        try {
            var handleMathExp = mathExpression.replace(/^<[^>]+?>$/, "");
            var mathHtml = katex_1.default.renderToString(handleMathExp, __assign({ throwOnError: true }, reset));
            var ast = core_1.parse(mathHtml, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(ast, __assign({}, traverseOpts));
            var old = generator_1.default(ast).code.replace(/\;$/, '');
            var asts = core_1.parse(old, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(asts, __assign({}, traverseOpts));
            return generator_1.default(ast).code.replace(/\;$/, '');
        }
        catch (err) {
            handleKatexError(err);
        }
        return "";
    }, [handleKatexError, mathExpression, reset, traverseOpts]);
    return (react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: katexRenderString }, className: classnames_1.default("__katex-normal-style", cssClass) }));
};
exports.default = KatexMath;
