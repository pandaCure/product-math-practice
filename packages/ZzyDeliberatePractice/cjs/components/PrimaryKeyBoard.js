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
var operationStrMatch = /[^\d]+/;
var operationNumMatch = /[\d|\.]+/;
var PrimaryKeyBoard = function () {
    var _a = react_1.useState(true), edit = _a[0], setEdit = _a[1];
    var _b = react_1.useState(false), limitInput = _b[0], setLimitInput = _b[1];
    var _c = react_1.useState(''), userAnswer = _c[0], setUserAnswer = _c[1];
    var _d = react_1.useState(null), mq = _d[0], setMq = _d[1];
    var _e = react_1.useState({ key: '' }), mathExpression = _e[0], setMathExpression = _e[1];
    var _f = react_1.useContext(mathExpressionContext_1.MathExpressionContext), dispatch = _f.dispatch, enhanceDispatch = _f.enhanceDispatch, state = _f.state, prefixCls = _f.prefixCls;
    var deleteFlag = react_1.useRef(false);
    var cacheCurrentDoIndex = react_1.useRef(0);
    var handleClickKeyBoard = function (e, key) {
        e.stopPropagation();
        setEdit(true);
        !limitInput && setMathExpression({ key: key });
    };
    var handleInputExpression = function (latex, mathField) {
        if (!latex && !deleteFlag.current)
            return false;
        // TODO XSS攻击过滤
        var matchNumber = latex.replace(/\s/g, '').match(operationNumMatch);
        var matchString = latex.replace(/\s/g, '').match(operationStrMatch);
        var limitInputPre = (matchNumber && matchNumber[0].length > 2) || (matchString && matchString[0].length > 4);
        var limitInputPrev = (matchNumber && matchNumber[0].length > 3) || (matchString && matchString[0].length > 5);
        if (limitInputPre) {
            setLimitInput(true);
            mathField.keystroke('Enter');
            mathField.blur();
        }
        if (limitInputPrev)
            return false;
        setUserAnswer(latex);
        deleteFlag.current = false;
    };
    react_1.useEffect(function () {
        if (cacheCurrentDoIndex.current === state.currentDoProblemId) {
            dispatch({
                type: 'changeMathExpression',
                answerMathExpression: userAnswer,
                currentDoProblemId: state.currentDoProblemId
            });
        }
    }, [dispatch, state.currentDoProblemId, userAnswer]);
    var EditExpression = function (e) {
        e.stopPropagation();
        if (!limitInput) {
            setEdit(true);
            mq.blur();
        }
        else {
            mq.blur();
        }
    };
    var cancelEditExpression = function () {
        setMathExpression({ key: '' });
        setEdit(false);
    };
    var getMq = function (mq) { return setMq(mq); };
    var handleSubmitAnswer = react_1.useCallback(function () {
        // TODO 提示必填 否则进入不了下一题
        if (!userAnswer)
            return false;
        enhanceDispatch({
            currentDoProblemId: state.currentDoProblemId,
            userAnswer: userAnswer,
            type: 'doNextMathExpression'
        }).then(function (data) {
            // 下一步题处理
            setEdit(true);
            mq.latex('');
            mq.blur();
            setUserAnswer('');
            cacheCurrentDoIndex.current++;
            setLimitInput(false);
        });
    }, [enhanceDispatch, mq, state.currentDoProblemId, userAnswer]);
    var handleKeyBoardDelete = function (e) {
        mq.moveToRightEnd();
        deleteFlag.current = true;
        e.stopPropagation();
        setLimitInput(false);
        setEdit(true);
        mq.keystroke('Backspace');
        mq.moveToRightEnd();
        mq.blur();
    };
    react_1.useEffect(function () {
        var handleKeyword = function (e) {
            if (limitInput)
                return false;
            if (e.keyCode >= 48 && e.keyCode <= 57) {
                e.keyCode >= 48 && setMathExpression({ key: String(e.keyCode - 48) });
            }
            else if (e.keyCode >= 96 && e.keyCode <= 103) {
                e.keyCode >= 96 && setMathExpression({ key: String(e.keyCode - 96) });
            }
            else if (e.keyCode === 190) {
                setMathExpression({ key: '.' });
            }
            else if (e.keyCode === 13) {
                if (mq.latex())
                    handleSubmitAnswer();
            }
        };
        window.addEventListener('keyup', handleKeyword, false);
        return function () { return window.removeEventListener('keyup', handleKeyword, false); };
    }, [handleSubmitAnswer, mq]);
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
