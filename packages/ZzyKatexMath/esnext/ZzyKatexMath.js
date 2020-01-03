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
const katex_1 = __importDefault(require("katex"));
const core_1 = require("@babel/core");
const generator_1 = __importDefault(require("@babel/generator"));
const classnames_1 = __importDefault(require("classnames"));
const KatexMath = ({ mathExpression, children, handleKatexError, cssClass, traverseOpts, ...reset }) => {
    const katexRenderString = react_1.useMemo(() => {
        try {
            const handleMathExp = mathExpression.replace(/^<[^>]+?>$/, "");
            const mathHtml = katex_1.default.renderToString(handleMathExp, {
                throwOnError: true,
                ...reset
            });
            const ast = core_1.parse(mathHtml, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(ast, {
                ...traverseOpts
            });
            const old = generator_1.default(ast).code.replace(/\;$/, '');
            const asts = core_1.parse(old, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(asts, {
                ...traverseOpts
            });
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
