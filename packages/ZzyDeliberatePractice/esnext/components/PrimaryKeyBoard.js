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
const classnames_1 = __importDefault(require("classnames"));
const submit_button_png_1 = __importDefault(require("../asserts/submit-button.png"));
const enhance_mathquill_edit_1 = __importDefault(require("enhance-mathquill-edit"));
const mathExpressionContext_1 = require("../mathExpressionContext");
const KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];
const operationStrMatch = /[^\d\.]+/;
const operationNumMatch = /[\d|\.]+/;
const PrimaryKeyBoard = () => {
    const [edit, setEdit] = react_1.useState(true);
    const [limitInput, setLimitInput] = react_1.useState(false);
    const [userAnswer, setUserAnswer] = react_1.useState('');
    const [mq, setMq] = react_1.useState(null);
    const [mathExpression, setMathExpression] = react_1.useState({ key: '' });
    const { dispatch, enhanceDispatch, state, prefixCls } = react_1.useContext(mathExpressionContext_1.MathExpressionContext);
    const deleteFlag = react_1.useRef(false);
    const inputFlag = react_1.useRef(0);
    const cacheCurrentDoIndex = react_1.useRef(0);
    const handleClickKeyBoard = (e, key) => {
        e.stopPropagation();
        setEdit(true);
        inputFlag.current < 3 && inputFlag.current++;
        !limitInput && setMathExpression({ key });
    };
    const handleInputExpression = (latex, mathField) => {
        if (!latex && !deleteFlag.current)
            return false;
        // TODO XSS攻击过滤
        const matchNumber = latex.replace(/\s/g, '').match(operationNumMatch);
        const matchString = latex.replace(/\s/g, '').match(operationStrMatch);
        const limitInputPre = matchNumber && matchNumber[0].length > 2;
        const limitInputPrev = matchNumber && matchNumber[0].length > 3;
        if (limitInputPre) {
            setLimitInput(true);
            mathField.keystroke('Enter');
            mathField.blur();
            if (latex.length > 3 && !matchString) {
                return mathField.keystroke('Backspace');
            }
        }
        else {
            setLimitInput(false);
        }
        if (limitInputPrev)
            return false;
        if (matchString) {
            return mathField.keystroke('Backspace');
        }
        if (latex.length > 3) {
            return mathField.keystroke('Backspace');
        }
        if (inputFlag.current !== latex.length)
            return mathField.keystroke('Backspace');
        setUserAnswer(latex);
        deleteFlag.current = false;
    };
    react_1.useEffect(() => {
        if (cacheCurrentDoIndex.current === state.currentDoProblemId) {
            dispatch({
                type: 'changeMathExpression',
                answerMathExpression: userAnswer,
                currentDoProblemId: state.currentDoProblemId
            });
        }
    }, [dispatch, state.currentDoProblemId, userAnswer]);
    const EditExpression = (e) => {
        e.stopPropagation();
        if (!limitInput) {
            setEdit(true);
            mq.blur();
        }
        else {
            mq.blur();
        }
    };
    const cancelEditExpression = () => {
        setMathExpression({ key: '' });
        setEdit(false);
    };
    const getMq = (mq) => setMq(mq);
    const handleSubmitAnswer = react_1.useCallback(() => {
        // TODO 提示必填 否则进入不了下一题
        if (!userAnswer)
            return false;
        enhanceDispatch({
            currentDoProblemId: state.currentDoProblemId,
            userAnswer,
            type: 'doNextMathExpression'
        }).then(data => {
            // 下一步题处理
            inputFlag.current = 0;
            setEdit(true);
            mq.latex('');
            mq.blur();
            setUserAnswer('');
            cacheCurrentDoIndex.current++;
            setLimitInput(false);
        });
    }, [enhanceDispatch, mq, state.currentDoProblemId, userAnswer]);
    const handleKeyBoardDelete = (e) => {
        inputFlag.current > 0 && inputFlag.current--;
        mq.moveToRightEnd();
        deleteFlag.current = true;
        e.stopPropagation();
        setLimitInput(false);
        setEdit(true);
        mq.keystroke('Backspace');
        mq.moveToRightEnd();
        mq.blur();
    };
    react_1.useEffect(() => {
        const handleKeyword = (e) => {
            if (e.keyCode === 8) {
                inputFlag.current > 0 && inputFlag.current--;
                mq.moveToRightEnd();
                deleteFlag.current = true;
                setLimitInput(false);
                setEdit(true);
                mq.keystroke('Backspace');
                mq.moveToRightEnd();
                mq.blur();
            }
            if (e.keyCode === 13) {
                inputFlag.current > 0 && handleSubmitAnswer();
            }
            if (limitInput)
                return false;
            if (e.keyCode >= 48 && e.keyCode <= 57) {
                inputFlag.current < 3 && inputFlag.current++;
                e.keyCode >= 48 && setMathExpression({ key: String(e.keyCode - 48) });
            }
            else if (e.keyCode >= 96 && e.keyCode <= 103) {
                inputFlag.current < 3 && inputFlag.current++;
                e.keyCode >= 96 && setMathExpression({ key: String(e.keyCode - 96) });
            }
            else if (e.keyCode === 190) {
                inputFlag.current < 3 && inputFlag.current++;
                setMathExpression({ key: '.' });
            }
        };
        window.addEventListener('keydown', handleKeyword, false);
        return () => window.removeEventListener('keydown', handleKeyword, false);
    }, [limitInput, handleSubmitAnswer, mq]);
    return (react_1.default.createElement("div", { className: `${prefixCls}-keyboard-container`, onClick: cancelEditExpression },
        react_1.default.createElement("div", { className: `${prefixCls}-input-block`, onClick: EditExpression },
            react_1.default.createElement("div", { className: `${prefixCls}-input-value-block` },
                react_1.default.createElement("div", { className: `${prefixCls}-edit-block` },
                    react_1.default.createElement(enhance_mathquill_edit_1.default, { mathExpression: mathExpression, handleInputExpression: handleInputExpression, edit: edit, getMq: getMq })))),
        react_1.default.createElement("ul", { className: `${prefixCls}-keyboard` },
            KEY.map((v, i) => {
                return (react_1.default.createElement("li", { className: `${prefixCls}-keyboard-key`, key: i, onClick: e => handleClickKeyBoard(e, v) }, v));
            }),
            react_1.default.createElement("li", { className: `${prefixCls}-keyboard-key`, onClick: handleKeyBoardDelete },
                react_1.default.createElement("div", { className: classnames_1.default(`${prefixCls}-icon`, `${prefixCls}-icon-delete`, `${prefixCls}-key-icon`) }))),
        react_1.default.createElement("div", { className: `${prefixCls}-keyboard-button` },
            react_1.default.createElement("img", { src: submit_button_png_1.default, alt: "submit button", className: `${prefixCls}-keyboard-button-icon`, onClick: handleSubmitAnswer }))));
};
exports.default = PrimaryKeyBoard;
