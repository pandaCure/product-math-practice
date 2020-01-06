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
var classnames_1 = __importDefault(require("classnames"));
var submit_button_png_1 = __importDefault(require("../asserts/submit-button.png"));
var enhance_mathquill_edit_1 = __importDefault(require("enhance-mathquill-edit"));
var mathExpressionContext_1 = require("../mathExpressionContext");
var KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];
var PrimaryKeyBoard = function () {
    var _a = react_1.useState(true), edit = _a[0], setEdit = _a[1];
    var _b = react_1.useState(''), userAnswer = _b[0], setUserAnswer = _b[1];
    var _c = react_1.useState(null), mq = _c[0], setMq = _c[1];
    var _d = react_1.useState({ key: '' }), mathExpression = _d[0], setMathExpression = _d[1];
    var _e = react_1.useContext(mathExpressionContext_1.MathExpressionContext), dispatch = _e.dispatch, enhanceDispatch = _e.enhanceDispatch, state = _e.state, prefixCls = _e.prefixCls;
    var deleteFlag = react_1.useRef(false);
    var cacheCurrentDoIndex = react_1.useRef(0);
    var handleClickKeyBoard = function (e, key) {
        e.stopPropagation();
        setMathExpression({ key: key });
    };
    var handleInputExpression = function (latex, mathField) {
        if (!latex && !deleteFlag.current)
            return false;
        // TODO XSS攻击过滤
        setUserAnswer(latex);
        deleteFlag.current = false;
    };
    react_1.useEffect(function () {
        if (cacheCurrentDoIndex.current === state.addition.currentDoProblemId) {
            dispatch({
                type: 'changeMathExpression',
                answerMathExpression: userAnswer,
                currentDoProblemId: state.addition.currentDoProblemId
            });
        }
    }, [dispatch, state.addition.currentDoProblemId, userAnswer]);
    var EditExpression = function (e) {
        e.stopPropagation();
        setEdit(true);
        mq.focus();
    };
    var cancelEditExpression = function () {
        setMathExpression({ key: '' });
        setEdit(false);
    };
    var getMq = function (mq) { return setMq(mq); };
    var handleSubmitAnswer = function (e) {
        e.stopPropagation();
        // TODO 提示必填 否则进入不了下一题
        if (!userAnswer)
            return false;
        enhanceDispatch({
            currentDoProblemId: state.addition.currentDoProblemId,
            userAnswer: userAnswer,
            type: 'doNextMathExpression'
        }).then(function (data) {
            // 下一步题处理
            setEdit(true);
            mq.latex('');
            mq.blur();
            setUserAnswer('');
            cacheCurrentDoIndex.current++;
        });
    };
    var handleKeyBoardDelete = function (e) {
        deleteFlag.current = true;
        e.stopPropagation();
        setEdit(true);
        mq.keystroke('Backspace');
        mq.blur();
    };
    return (react_1.default.createElement("div", { className: prefixCls + "-keyboard-container", onClick: cancelEditExpression },
        react_1.default.createElement("div", { className: prefixCls + "-input-block", onClick: EditExpression },
            react_1.default.createElement("div", { className: prefixCls + "-input-value-block" },
                react_1.default.createElement("div", { className: prefixCls + "-edit-block" },
                    react_1.default.createElement(enhance_mathquill_edit_1.default, { mathExpression: mathExpression, handleInputExpression: handleInputExpression, edit: edit, getMq: getMq })))),
        react_1.default.createElement("ul", { className: prefixCls + "-keyboard" },
            KEY.map(function (v, i) {
                return (react_1.default.createElement("li", { className: prefixCls + "-keyboard-key", key: i, onClick: function (e) { return handleClickKeyBoard(e, v); } }, v));
            }),
            react_1.default.createElement("li", { className: prefixCls + "-keyboard-key", onClick: handleKeyBoardDelete },
                react_1.default.createElement("div", { className: classnames_1.default(prefixCls + "-icon", prefixCls + "-icon-delete", prefixCls + "-key-icon") }))),
        react_1.default.createElement("div", { className: prefixCls + "-keyboard-button" },
            react_1.default.createElement("img", { src: submit_button_png_1.default, alt: "submit button", className: prefixCls + "-keyboard-button-icon", onClick: handleSubmitAnswer }))));
};
exports.default = PrimaryKeyBoard;
