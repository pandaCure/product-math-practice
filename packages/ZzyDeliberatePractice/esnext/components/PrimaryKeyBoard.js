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
const PrimaryKeyBoard = () => {
    const [edit, setEdit] = react_1.useState(true);
    const [userAnswer, setUserAnswer] = react_1.useState('');
    const [mq, setMq] = react_1.useState(null);
    const [mathExpression, setMathExpression] = react_1.useState({ key: '' });
    const { dispatch, enhanceDispatch, state, prefixCls } = react_1.useContext(mathExpressionContext_1.MathExpressionContext);
    const deleteFlag = react_1.useRef(false);
    const handleClickKeyBoard = (key) => {
        setMathExpression({ key });
    };
    const handleInputExpression = (latex, mathField) => {
        if (!latex && !deleteFlag.current)
            return false;
        // TODO XSS攻击过滤
        setUserAnswer(latex);
        deleteFlag.current = false;
    };
    react_1.useEffect(() => {
        dispatch({
            type: 'changeMathExpression',
            answerMathExpression: userAnswer,
            currentDoProblemId: state.addition.currentDoProblemId
        });
    }, [dispatch, state.addition.currentDoProblemId, userAnswer]);
    const EditExpression = (e) => {
        e.stopPropagation();
        setEdit(true);
        mq.focus();
    };
    const cancelEditExpression = () => setEdit(false);
    const getMq = (mq) => setMq(mq);
    const handleSubmitAnswer = () => {
        // TODO 提示必填 否则进入不了下一题
        if (!userAnswer)
            return false;
        enhanceDispatch({
            currentDoProblemId: state.addition.currentDoProblemId,
            userAnswer,
            type: 'doNextMathExpression'
        }).then(data => {
            // 下一步题处理
            console.log(data);
            setEdit(true);
            mq.latex('');
            mq.blur();
        });
    };
    const handleKeyBoardDelete = (e) => {
        console.log('del');
        deleteFlag.current = true;
        e.stopPropagation();
        setEdit(true);
        mq.keystroke('Backspace');
        mq.blur();
    };
    return (react_1.default.createElement("div", { className: `${prefixCls}-keyboard-container`, onClick: cancelEditExpression },
        react_1.default.createElement("div", { className: `${prefixCls}-input-block`, onClick: EditExpression },
            react_1.default.createElement("div", { className: `${prefixCls}-input-value-block` },
                react_1.default.createElement("div", { className: `${prefixCls}-edit-block` },
                    react_1.default.createElement(enhance_mathquill_edit_1.default, { mathExpression: mathExpression, handleInputExpression: handleInputExpression, edit: edit, getMq: getMq })))),
        react_1.default.createElement("ul", { className: `${prefixCls}-keyboard` },
            KEY.map((v, i) => {
                return (react_1.default.createElement("li", { className: `${prefixCls}-keyboard-key`, key: i, onClick: () => handleClickKeyBoard(v) }, v));
            }),
            react_1.default.createElement("li", { className: `${prefixCls}-keyboard-key`, onClick: handleKeyBoardDelete },
                react_1.default.createElement("div", { className: classnames_1.default('zzy-icon', 'zzy-icon-delete', `${prefixCls}-key-icon`) }))),
        react_1.default.createElement("div", { className: `${prefixCls}-keyboard-button` },
            react_1.default.createElement("img", { src: submit_button_png_1.default, alt: "submit button", className: `${prefixCls}-keyboard-button-icon`, onClick: handleSubmitAnswer }))));
};
exports.default = PrimaryKeyBoard;