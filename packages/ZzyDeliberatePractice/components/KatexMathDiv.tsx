import React, { useContext } from 'react'
import KatexMath from 'zzy-katex-math'
import EnhanceMathQuillNoEdit from 'enhance-mathquill-no-edit'
import classnames from 'classnames'
import { MathExpressionContext } from '../mathExpressionContext'
export interface IKatexMathDiv {
  mathExpression: string
  answerMathExpression: string
  changeBorderColor: boolean
}
const KatexMathDiv: React.FC<IKatexMathDiv> = ({
  mathExpression,
  answerMathExpression,
  changeBorderColor
}) => {
  const { prefixCls } = useContext(MathExpressionContext)
  return (
    <div className={`${prefixCls}-question`}>
      <KatexMath mathExpression={mathExpression} handleKatexError={() => {}} />
      <div
        className={classnames(
          `${prefixCls}-answer`,
          changeBorderColor ? `${prefixCls}-change-border-color` : ''
        )}
      >
        <EnhanceMathQuillNoEdit mathExpression={answerMathExpression} />
      </div>
    </div>
  )
}

export default KatexMathDiv
