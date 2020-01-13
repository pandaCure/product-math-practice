import React, { useContext, useRef, useEffect } from 'react'
import KatexMathDiv from './KatexMathDiv'
import {
  MathExpressionContext,
  IMathExpressionType
} from '../mathExpressionContext'
import classnames from 'classnames'
import pathImage from '../asserts/path.png'
const ShowQuestion = () => {
  const { state, prefixCls } = useContext(MathExpressionContext)
  const { mathExpression, currentDoProblemId } = state
  const liDOM = useRef<HTMLLIElement | null>(null)
  const uiDOM = useRef<HTMLUListElement | null>(null)
  useEffect(() => {
    if (liDOM!.current && uiDOM!.current) {
      uiDOM.current.style.transform = `translate3d(0, ${70.685 *
        -currentDoProblemId}px, 0)`
    }
  }, [currentDoProblemId])
  return (
    <div className={`${prefixCls}-show-question`}>
      <div className={`${prefixCls}-question-block`}>
        <ul className={`${prefixCls}-question-view`} ref={uiDOM}>
          {mathExpression.map((v: IMathExpressionType, i: number) => {
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
                <div
                  className={`${prefixCls}-question-tag`}
                  style={{ display: currentDoProblemId === i ? '' : 'none' }}
                >
                  <img
                    src={pathImage}
                    alt="pathImage"
                    className={`${prefixCls}-question-tag-animation1`}
                  />
                  <img
                    src={pathImage}
                    alt="pathImage"
                    className={`${prefixCls}-question-tag-animation2`}
                  />
                  <img
                    src={pathImage}
                    alt="pathImage"
                    className={`${prefixCls}-question-tag-animation3`}
                  />
                </div>
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
      <div className={`${prefixCls}-question-bottom`} />
    </div>
  )
}

export default ShowQuestion
