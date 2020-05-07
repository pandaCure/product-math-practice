let __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod?.__esModule) return mod
    let result = {}
    if (mod != null)
      for (let k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
let __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod?.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
let react_1 = __importStar(require('react'))
let classnames_1 = __importDefault(require('classnames'))
let submit_button_png_1 = __importDefault(
  require('../asserts/submit-button.png')
)
let enhance_mathquill_edit_1 = __importDefault(
  require('enhance-mathquill-edit')
)
let mathExpressionContext_1 = require('../mathExpressionContext')
let KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
let operationStrMatch = /[^\d\.]+/
let operationNumMatch = /[\d|\.]+/
let PrimaryKeyBoard = function() {
  let _a = react_1.useState(true)
  let edit = _a[0]
  let setEdit = _a[1]
  let _b = react_1.useState(false)
  let limitInput = _b[0]
  let setLimitInput = _b[1]
  let _c = react_1.useState('')
  let userAnswer = _c[0]
  let setUserAnswer = _c[1]
  let _d = react_1.useState(null)
  let mq = _d[0]
  let setMq = _d[1]
  let _e = react_1.useState({ key: '' })
  let mathExpression = _e[0]
  let setMathExpression = _e[1]
  let _f = react_1.useContext(mathExpressionContext_1.MathExpressionContext)
  let dispatch = _f.dispatch
  let enhanceDispatch = _f.enhanceDispatch
  let state = _f.state
  let prefixCls = _f.prefixCls
  let deleteFlag = react_1.useRef(false)
  let inputFlag = react_1.useRef(0)
  let cacheCurrentDoIndex = react_1.useRef(0)
  let handleClickKeyBoard = function(e, key) {
    e.stopPropagation()
    setEdit(true)
    inputFlag.current < 3 && inputFlag.current++
    !limitInput && setMathExpression({ key: key })
  }
  let handleInputExpression = function(latex, mathField) {
    if (!latex && !deleteFlag.current) return false
    // TODO XSS攻击过滤
    let matchNumber = latex.replace(/\s/g, '').match(operationNumMatch)
    let matchString = latex.replace(/\s/g, '').match(operationStrMatch)
    let limitInputPre = matchNumber && matchNumber[0].length > 2
    let limitInputPrev = matchNumber && matchNumber[0].length > 3
    if (limitInputPre) {
      setLimitInput(true)
      mathField.keystroke('Enter')
      mathField.blur()
      if (latex.length > 3 && !matchString) {
        return mathField.keystroke('Backspace')
      }
    } else {
      setLimitInput(false)
    }
    if (limitInputPrev) return false
    if (matchString) {
      return mathField.keystroke('Backspace')
    }
    if (latex.length > 3) {
      return mathField.keystroke('Backspace')
    }
    if (inputFlag.current !== latex.length)
      return mathField.keystroke('Backspace')
    setUserAnswer(latex)
    deleteFlag.current = false
  }
  react_1.useEffect(
    function() {
      if (cacheCurrentDoIndex.current === state.currentDoProblemId) {
        dispatch({
          type: 'changeMathExpression',
          answerMathExpression: userAnswer,
          currentDoProblemId: state.currentDoProblemId
        })
      }
    },
    [dispatch, state.currentDoProblemId, userAnswer]
  )
  let EditExpression = function(e) {
    e.stopPropagation()
    if (!limitInput) {
      setEdit(true)
      mq.blur()
    } else {
      mq.blur()
    }
  }
  let cancelEditExpression = function() {
    setMathExpression({ key: '' })
    setEdit(false)
  }
  let getMq = function(mq) {
    return setMq(mq)
  }
  let handleSubmitAnswer = react_1.useCallback(
    function() {
      // TODO 提示必填 否则进入不了下一题
      if (!userAnswer) return false
      enhanceDispatch({
        currentDoProblemId: state.currentDoProblemId,
        userAnswer: userAnswer,
        type: 'doNextMathExpression'
      }).then(function(data) {
        // 下一步题处理
        inputFlag.current = 0
        setEdit(true)
        mq.latex('')
        mq.blur()
        setUserAnswer('')
        cacheCurrentDoIndex.current++
        setLimitInput(false)
      })
    },
    [enhanceDispatch, mq, state.currentDoProblemId, userAnswer]
  )
  let handleKeyBoardDelete = function(e) {
    inputFlag.current > 0 && inputFlag.current--
    mq.moveToRightEnd()
    deleteFlag.current = true
    e.stopPropagation()
    setLimitInput(false)
    setEdit(true)
    mq.keystroke('Backspace')
    mq.moveToRightEnd()
    mq.blur()
  }
  react_1.useEffect(
    function() {
      let handleKeyword = function(e) {
        if (e.keyCode === 8) {
          inputFlag.current > 0 && inputFlag.current--
          mq.moveToRightEnd()
          deleteFlag.current = true
          setLimitInput(false)
          setEdit(true)
          mq.keystroke('Backspace')
          mq.moveToRightEnd()
          mq.blur()
        }
        if (e.keyCode === 13) {
          inputFlag.current > 0 && handleSubmitAnswer()
        }
        if (limitInput) return false
        if (e.keyCode >= 48 && e.keyCode <= 57) {
          inputFlag.current < 3 && inputFlag.current++
          e.keyCode >= 48 && setMathExpression({ key: String(e.keyCode - 48) })
        } else if (e.keyCode >= 96 && e.keyCode <= 105) {
          inputFlag.current < 3 && inputFlag.current++
          e.keyCode >= 96 && setMathExpression({ key: String(e.keyCode - 96) })
        } else if (e.keyCode === 190) {
          inputFlag.current < 3 && inputFlag.current++
          setMathExpression({ key: '.' })
        }
      }
      window.addEventListener('keydown', handleKeyword, false)
      return function() {
        return window.removeEventListener('keydown', handleKeyword, false)
      }
    },
    [limitInput, handleSubmitAnswer, mq]
  )
  return react_1.default.createElement(
    'div',
    {
      className: prefixCls + '-keyboard-container',
      onClick: cancelEditExpression
    },
    react_1.default.createElement(
      'div',
      { className: prefixCls + '-input-block', onClick: EditExpression },
      react_1.default.createElement(
        'div',
        { className: prefixCls + '-input-value-block' },
        react_1.default.createElement(
          'div',
          { className: prefixCls + '-edit-block' },
          react_1.default.createElement(enhance_mathquill_edit_1.default, {
            mathExpression: mathExpression,
            handleInputExpression: handleInputExpression,
            edit: edit,
            getMq: getMq
          })
        )
      )
    ),
    react_1.default.createElement(
      'ul',
      { className: prefixCls + '-keyboard' },
      KEY.map(function(v, i) {
        return react_1.default.createElement(
          'li',
          {
            className: prefixCls + '-keyboard-key',
            key: i,
            onClick: function(e) {
              return handleClickKeyBoard(e, v)
            }
          },
          v
        )
      }),
      react_1.default.createElement(
        'li',
        {
          className: prefixCls + '-keyboard-key',
          onClick: handleKeyBoardDelete
        },
        react_1.default.createElement('div', {
          className: classnames_1.default(
            prefixCls + '-icon',
            prefixCls + '-icon-delete',
            prefixCls + '-key-icon'
          )
        })
      )
    ),
    react_1.default.createElement(
      'div',
      { className: prefixCls + '-keyboard-button' },
      react_1.default.createElement('img', {
        src: submit_button_png_1.default,
        alt: 'submit button',
        className: prefixCls + '-keyboard-button-icon',
        onClick: handleSubmitAnswer
      })
    )
  )
}
exports.default = PrimaryKeyBoard
