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
let KatexMathDiv_1 = __importDefault(require('./KatexMathDiv'))
let mathExpressionContext_1 = require('../../mathExpressionContext')
let classnames_1 = __importDefault(require('classnames'))
let ShowQuestion = function() {
  let _a = react_1.useContext(mathExpressionContext_1.MathExpressionContext)
  let state = _a.state
  let prefixCls = _a.prefixCls
  let _b = state.addition
  let addMathExpression = _b.addMathExpression
  let currentDoProblemId = _b.currentDoProblemId
  let liDOM = react_1.useRef(null)
  let uiDOM = react_1.useRef(null)
  react_1.useEffect(
    function() {
      if (liDOM.current && uiDOM.current) {
        let height = liDOM.current.getBoundingClientRect().height
        uiDOM.current.style.transform =
          'translate3d(0, ' + height * -currentDoProblemId + 'px, 0)'
      }
    },
    [currentDoProblemId]
  )
  return react_1.default.createElement(
    'div',
    { className: prefixCls + '-show-question' },
    react_1.default.createElement(
      'div',
      { className: prefixCls + '-question-block' },
      react_1.default.createElement(
        'ul',
        { className: prefixCls + '-question-view', ref: uiDOM },
        addMathExpression.map(function(v, i) {
          return react_1.default.createElement(
            'li',
            {
              key: i,
              className: classnames_1.default(
                currentDoProblemId === i
                  ? prefixCls + '-change-color'
                  : prefixCls + '-base-color',
                prefixCls + '-base-item'
              ),
              ref: liDOM
            },
            react_1.default.createElement(KatexMathDiv_1.default, {
              mathExpression: v.expression,
              answerMathExpression: v.answerMathExpression,
              changeBorderColor: currentDoProblemId === i
            })
          )
        })
      )
    )
  )
}
exports.default = ShowQuestion
