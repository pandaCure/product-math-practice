import React, { useContext, useRef, useEffect } from 'react'
import './index.scss'
import KatexMathDiv from '@/components/KatexMath/KatexMathDiv'
import { MathExpressionContext } from '@/components/mathExpressionContext'
import classnames from 'classnames'
const ShowQuestion = () => {
  const { state } = useContext(MathExpressionContext)
  const { mathExpression, currentDoProblemId } = state
  const liDOM = useRef<HTMLLIElement|null>(null)
  const uiDOM = useRef<HTMLUListElement|null>(null)
  useEffect(() => {
    if (liDOM!.current && uiDOM!.current) {
      // const { height } = liDOM.current.getBoundingClientRect()
      uiDOM.current.style.transform = `translate3d(0, ${70.685 * -currentDoProblemId}px, 0)`
    }
  }, [currentDoProblemId])
  return (
    <div className="zzy-show-question">
      <div className="question-block">
        <ul className="question-view" ref={uiDOM}>
          {mathExpression.map((v, i) => {
            return (
              <li
                key={i}
                className={classnames(
                  currentDoProblemId === i ? 'change-color' : 'base-color',
                  "base-item"
                )}
                ref={liDOM}
              >
                <div className="question-tag" style={{display: currentDoProblemId === i ? '' : 'none'}}/>
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
      <div className="question-bottom" />
    </div>
  )
}

export default ShowQuestion
