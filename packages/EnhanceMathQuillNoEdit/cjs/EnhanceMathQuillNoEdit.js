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
        JSXAttribute: {
            exit: function (nodePath) {
                var attrNode = nodePath.node.value;
                if (t.isStringLiteral(attrNode) &&
                    attrNode.value === 'mq-editable-field mq-math-mode') {
                    nodePath.insertAfter(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'DIN' !important;")));
                }
            }
        }
    }
};
var EnhanceMathQuillNoEdit = function (_a) {
    var mathExpression = _a.mathExpression, traverseOpts = _a.traverseOpts;
    var html = react_1.useMemo(function () {
        // TODO createDocumentFragment需要优化吗
        var mq = mathquillloader_1.MathQuill.MathField(document.createElement('div'));
        mq.write(mathExpression);
        var ast = core_1.parse(mq.el().outerHTML, {
            parserOpts: {
                sourceType: 'module',
                plugins: ['jsx']
            }
        });
        core_1.traverse(ast, __assign({}, traverseOpts));
        return generator_1.default(ast).code.replace(/\;$/, '');
    }, [mathExpression, traverseOpts]);
    return react_1.default.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
};
EnhanceMathQuillNoEdit.defaultProps = defaultProps;
exports.default = EnhanceMathQuillNoEdit;
