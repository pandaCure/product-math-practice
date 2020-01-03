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
        JSXAttribute: {
            exit: (nodePath) => {
                const attrNode = nodePath.node.value;
                if (t.isStringLiteral(attrNode) &&
                    attrNode.value === 'mq-editable-field mq-math-mode') {
                    nodePath.insertAfter(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'DIN' !important;")));
                }
            }
        }
    }
};
const EnhanceMathQuillNoEdit = ({ mathExpression, traverseOpts }) => {
    const html = react_1.useMemo(() => {
        // TODO createDocumentFragment需要优化吗
        const mq = mathquillloader_1.MathQuill.MathField(document.createElement('div'));
        mq.write(mathExpression);
        const ast = core_1.parse(mq.el().outerHTML, {
            parserOpts: {
                sourceType: 'module',
                plugins: ['jsx']
            }
        });
        core_1.traverse(ast, {
            // JSXAttribute: {
            //   exit: (nodePath: NodePath<t.JSXAttribute>) => {
            //     const attrNode = nodePath.node.value
            //     if (
            //       t.isStringLiteral(attrNode) &&
            //       attrNode.value === 'mq-editable-field mq-math-mode'
            //     ) {
            //       nodePath.insertAfter(
            //         t.jsxAttribute(
            //           t.jsxIdentifier('style'),
            //           t.stringLiteral("font-family: 'DIN' !important;")
            //         )
            //       )
            //     }
            //   }
            // }
            ...traverseOpts
        });
        return generator_1.default(ast).code.replace(/\;$/, '');
    }, [mathExpression, traverseOpts]);
    return react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
};
EnhanceMathQuillNoEdit.defaultProps = defaultProps;
exports.default = EnhanceMathQuillNoEdit;
