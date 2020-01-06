import React, { useContext, useRef, useEffect } from 'react'
import KatexMathDiv from './KatexMathDiv'
import { MathExpressionContext, IMathExpression } from '../mathExpressionContext'
import classnames from 'classnames'
const ShowQuestion = () => {
  const { state, prefixCls } = useContext(MathExpressionContext)
  const { addMathExpression, currentDoProblemId } = state.addition
  const liDOM = useRef<HTMLLIElement | null>(null)
  const uiDOM = useRef<HTMLUListElement | null>(null)
  useEffect(() => {
    if (liDOM!.current && uiDOM!.current) {
      const { height } = liDOM.current.getBoundingClientRect()
      uiDOM.current.style.transform = `translate3d(0, ${height *
        -currentDoProblemId}px, 0)`
    }
  }, [currentDoProblemId])
  return (
    <div className={`${prefixCls}-show-question`}>
      <div className={`${prefixCls}-question-block`}>
        <ul className={`${prefixCls}-question-view`} ref={uiDOM}>
          {addMathExpression.map((v:IMathExpression, i:number) => {
            return (
              <li
                key={i}
                className={classnames(
                  currentDoProblemId === i
                    ? `${prefixCls}-change-color`
                    : `${prefixCls}-base-color`,
                  `${prefixCls}-base-item`
                )}
                ref={liDOM}
              >
                <KatexMathDiv
                  mathExpression={v.expression}
                  answerMathExpression={v.answerMathExpression}
                  changeBorderColor={currentDoProblemId === i}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ShowQuestion
