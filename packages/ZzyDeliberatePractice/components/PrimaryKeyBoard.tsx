import React, { useState, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import submitButton from '../asserts/submit-button.png'
import EnhanceMathQuillEdit from 'enhance-mathquill-edit'
import { MathFieldReturn } from 'mathquillloader'
import { MathExpressionContext } from '../mathExpressionContext'
const KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
const PrimaryKeyBoard = () => {
  const [edit, setEdit] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [mq, setMq] = useState<MathFieldReturn|null>(null)
  const [mathExpression, setMathExpression] = useState({ key: '' })
  const { dispatch, enhanceDispatch, state, prefixCls } = useContext(
    MathExpressionContext
  )
  const deleteFlag = useRef<boolean | null>(false)
  const handleClickKeyBoard = (key: any) => {
    setMathExpression({ key })
  }
  const handleInputExpression = (
    latex: string,
    mathField: MathFieldReturn
  ) => {
    if (!latex && !deleteFlag!.current) return false
    // TODO XSS攻击过滤
    setUserAnswer(latex)
    deleteFlag.current = false
  }
  useEffect(() => {
    dispatch({
      type: 'changeMathExpression',
      answerMathExpression: userAnswer,
      currentDoProblemId: state.addition.currentDoProblemId
    })
  }, [dispatch, state.addition.currentDoProblemId, userAnswer])
  const EditExpression = (e: any) => {
    e.stopPropagation()
    setEdit(true)
    mq!.focus()
  }
  const cancelEditExpression = () => setEdit(false)
  const getMq = (mq: MathFieldReturn) => setMq(mq)
  const handleSubmitAnswer = () => {
    // TODO 提示必填 否则进入不了下一题
    if (!userAnswer) return false
    enhanceDispatch({
      currentDoProblemId: state.addition.currentDoProblemId,
      userAnswer,
      type: 'doNextMathExpression'
    }).then(data => {
      // 下一步题处理
      setEdit(true)
      mq!.latex('')
      mq!.blur()
    })
  }
  const handleKeyBoardDelete = (e: any) => {
    deleteFlag.current = true
    e.stopPropagation()
    setEdit(true)
    mq!.keystroke('Backspace')
    mq!.blur()
  }
  return (
    <div
      className={`${prefixCls}-keyboard-container`}
      onClick={cancelEditExpression}
    >
      <div className={`${prefixCls}-input-block`} onClick={EditExpression}>
        <div className={`${prefixCls}-input-value-block`}>
          <div className={`${prefixCls}-edit-block`}>
            <EnhanceMathQuillEdit
              mathExpression={mathExpression}
              handleInputExpression={handleInputExpression}
              edit={edit}
              getMq={getMq}
            />
          </div>
        </div>
      </div>
      <ul className={`${prefixCls}-keyboard`}>
        {KEY.map((v, i) => {
          return (
            <li
              className={`${prefixCls}-keyboard-key`}
              key={i}
              onClick={() => handleClickKeyBoard(v)}
            >
              {v}
            </li>
          )
        })}
        <li
          className={`${prefixCls}-keyboard-key`}
          onClick={handleKeyBoardDelete}
        >
          <div
            className={classnames(
              'zzy-icon',
              'zzy-icon-delete',
              `${prefixCls}-key-icon`
            )}
          />
        </li>
      </ul>
      <div className={`${prefixCls}-keyboard-button`}>
        <img
          src={submitButton}
          alt="submit button"
          className={`${prefixCls}-keyboard-button-icon`}
          onClick={handleSubmitAnswer}
        />
      </div>
    </div>
  )
}
export default PrimaryKeyBoard
