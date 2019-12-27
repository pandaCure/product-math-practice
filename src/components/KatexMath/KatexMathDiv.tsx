import React from 'react'
import KatexMath from './KatexMath'
import EnhanceMathQuillNoEdit from '@/components/EnhanceMathQuill/EnhanceMathQuillNoEdit'
import classnames from 'classnames'
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
  return (
    <div className="question">
      <KatexMath mathExpression={mathExpression} handleKatexError={() => {}} />
      <div
        className={classnames(
          'answer',
          changeBorderColor ? 'change-border-color' : ''
        )}
      >
        <EnhanceMathQuillNoEdit mathExpression={answerMathExpression} />
      </div>
    </div>
  )
}

export default KatexMathDiv
