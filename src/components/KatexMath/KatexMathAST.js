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
var KatexMath_1 = __importDefault(require("./KatexMath"));
var t = __importStar(require("@babel/types"));
var answer_bg_svg_1 = __importDefault(require("@/asserts/answer-bg.svg"));
var astDOM = t.jsxElement(t.jsxOpeningElement(t.jsxIdentifier("span"), [
    t.jsxAttribute(t.jsxIdentifier("class"), t.stringLiteral("base")),
    t.jsxAttribute(t.jsxIdentifier("style"), t.stringLiteral("background-image: url(" + answer_bg_svg_1.default + ");background-size: 100%;background-repeat: no-repeat;width: " + 54 /
        28 + "em;height: " + 32 / 28 + "em;line-height: " + 32 /
        28 + "em;text-align:center;margin-left:0.2777777777777778em;")),
    t.jsxAttribute(t.jsxIdentifier("dangerouslySetInnerHTML"), t.jsxExpressionContainer(t.objectExpression([t.objectProperty(t.identifier('__html'), t.stringLiteral('<span>111</span>'))])))
], false), t.jsxClosingElement(t.jsxIdentifier("span")), 
// TODO 符号怎么办
[
    t.jsxText("568")
], false);
// t.stringLiteral('<span>111</span>')
var KatexMathAST = function () {
    var traverseOpts = react_1.useMemo(function () {
        return {
            JSXAttribute: function (nodePath) {
                var attrNode = nodePath.node.value;
                if (t.isStringLiteral(attrNode) && attrNode.value === "katex-html") {
                    var node = nodePath.findParent(function (path) {
                        return t.isJSXElement(path);
                    });
                    node.pushContainer("children", [astDOM]);
                }
            }
        };
    }, []);
    return (react_1.default.createElement(KatexMath_1.default, { traverseOpts: traverseOpts, mathExpression: "1+2=", handleKatexError: function () { } }));
};
exports.default = KatexMathAST;
