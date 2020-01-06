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
var mathquillloader_1 = require("mathquillloader");
var core_1 = require("@babel/core");
var generator_1 = __importDefault(require("@babel/generator"));
var t = __importStar(require("@babel/types"));
var defaultProps = {
    traverseOpts: {
        JSXAttribute: function (nodePath) {
            var attrNode = nodePath.node.value;
            if (t.isStringLiteral(attrNode) && attrNode.value === "mq-editable-field mq-math-mode") {
                var node = nodePath.getAllNextSiblings();
                node.forEach(function (v) { return v.replaceWith(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'Keyword' !important; opacity: 1"))); });
            }
        }
    },
    style: {
        fontFamily: "Keyword"
    }
};
var EnhanceMathQuillEdit = function (props) {
    var mathExpression = props.mathExpression, handleInputExpression = props.handleInputExpression, getMq = props.getMq, edit = props.edit, traverseOpts = props.traverseOpts, style = props.style;
    var _a = react_1.useState(''), katexRenderString = _a[0], setKatexRenderString = _a[1];
    var ele = react_1.useRef(null);
    var cacheMQ = react_1.useRef(null);
    react_1.useEffect(function () {
        if (ele.current && !cacheMQ.current) {
            var mq = mathquillloader_1.MathQuill.MathField(ele.current, {
                handlers: {
                    edit: function (mathField) {
                        handleInputExpression(mathField.latex(), mathField);
                    }
                }
            });
            cacheMQ.current = mq;
            getMq(mq);
        }
    }, [getMq, handleInputExpression]);
    react_1.useEffect(function () {
        if (cacheMQ.current) {
            var mq = cacheMQ.current;
            mq.write(mathExpression.key);
            var ast = core_1.parse(mq.el().outerHTML, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(ast, __assign({}, traverseOpts));
            // return generator(ast).code.replace(/\;$/, '');
            setKatexRenderString(generator_1.default(ast).code.replace(/\;$/, ''));
        }
    }, [mathExpression, traverseOpts]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { ref: ele, style: __assign(__assign({}, style), { position: "absolute", zIndex: edit ? 1 : -1, opacity: edit ? 1 : 0 }) }),
        react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: katexRenderString }, style: { position: "absolute", zIndex: edit ? -1 : 1, opacity: edit ? 0 : 1 } })));
};
EnhanceMathQuillEdit.defaultProps = defaultProps;
exports.default = EnhanceMathQuillEdit;
