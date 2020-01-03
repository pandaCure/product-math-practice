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
const mathquillloader_1 = require("mathquillloader");
const core_1 = require("@babel/core");
const generator_1 = __importDefault(require("@babel/generator"));
const t = __importStar(require("@babel/types"));
const defaultProps = {
    traverseOpts: {
        JSXAttribute(nodePath) {
            const attrNode = nodePath.node.value;
            if (t.isStringLiteral(attrNode) && attrNode.value === "mq-editable-field mq-math-mode") {
                const node = nodePath.getAllNextSiblings();
                node.forEach(v => v.replaceWith(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'Keyword' !important; opacity: 1"))));
            }
        }
    },
    style: {
        fontFamily: "Keyword"
    }
};
const EnhanceMathQuillEdit = (props) => {
    const { mathExpression, handleInputExpression, getMq, edit, traverseOpts, style } = props;
    const [katexRenderString, setKatexRenderString] = react_1.useState('');
    const ele = react_1.useRef(null);
    const cacheMQ = react_1.useRef(null);
    react_1.useEffect(() => {
        if (ele.current) {
            const mq = mathquillloader_1.MathQuill.MathField(ele.current, {
                handlers: {
                    edit: (mathField) => {
                        handleInputExpression(mathField.latex(), mathField);
                    }
                }
            });
            cacheMQ.current = mq;
            getMq(mq);
        }
    }, [getMq, handleInputExpression]);
    react_1.useEffect(() => {
        if (cacheMQ.current) {
            const mq = cacheMQ.current;
            mq.write(mathExpression.key);
            const ast = core_1.parse(mq.el().outerHTML, {
                parserOpts: {
                    sourceType: "module",
                    plugins: ["jsx"]
                }
            });
            core_1.traverse(ast, {
                ...traverseOpts
            });
            // return generator(ast).code.replace(/\;$/, '');
            setKatexRenderString(generator_1.default(ast).code.replace(/\;$/, ''));
        }
    }, [mathExpression, traverseOpts]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { ref: ele, style: { ...style, position: "absolute", zIndex: edit ? 1 : -1, opacity: edit ? 1 : 0 } }),
        react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: katexRenderString }, style: { position: "absolute", zIndex: edit ? -1 : 1, opacity: edit ? 0 : 1 } })));
};
EnhanceMathQuillEdit.defaultProps = defaultProps;
exports.default = EnhanceMathQuillEdit;
