import React, { useState, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import './index.scss'
import submitButton from '@/asserts/submit-button.png'
import EnhanceMathQuillEdit from '@/components/EnhanceMathQuill/EnhanceMathQuillEdit'
import { MathExpressionContext } from '@/components/mathExpressionContext'
const KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
const PrimaryKeyBoard = () => {
  const [edit, setEdit] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [mq, setMq] = useState({})
  const [mathExpression, setMathExpression] = useState({ key: '' })
  const { dispatch, enhanceDispatch, state } = useContext(MathExpressionContext)
  const deleteFlag = useRef<boolean | null>(false)
  const cacheCurrentDoIndex = useRef<number | null>(0)
  const handleClickKeyBoard = (e:any, key: any) => {
    e.stopPropagation()
    setMathExpression({ key })
  }
  const handleInputExpression = (latex, mathField) => {
    if (!latex && !deleteFlag!.current) return false
    // TODO XSS攻击过滤
    setUserAnswer(latex)
    deleteFlag.current = false
  }
  useEffect(() => {
    if (cacheCurrentDoIndex!.current === state.addition.currentDoProblemId) {
      dispatch({
        type: 'changeMathExpression',
        answerMathExpression: userAnswer,
        currentDoProblemId: state.addition.currentDoProblemId
      })
    }
  }, [dispatch, state.addition.currentDoProblemId, userAnswer])
  const EditExpression = (e: any) => {
    e.stopPropagation()
    setEdit(true)
    mq.focus()
  }
  const cancelEditExpression = () => {
    setMathExpression({ key: '' })
    setEdit(false)
  }
  const getMq = mq => setMq(mq)
  const handleSubmitAnswer = (e:any) => {
    e.stopPropagation()
    // TODO 提示必填 否则进入不了下一题
    if (!userAnswer) return false
    enhanceDispatch({
      currentDoProblemId: state.addition.currentDoProblemId,
      userAnswer,
      type: 'doNextMathExpression'
    }).then(data => {
      // 下一步题处理
      setEdit(true)
      mq.latex('').blur()
      setUserAnswer('')
      cacheCurrentDoIndex!.current++
    })
  }
  const handleKeyBoardDelete = (e: any) => {
    deleteFlag.current = true
    e.stopPropagation()
    setEdit(true)
    mq.keystroke('Backspace')
    mq.blur()
  }
  return (
    <div className="zzy-keyboard" onClick={cancelEditExpression}>
      <div className="input-block" onClick={EditExpression}>
        <div className="input-value-block">
          <div className="edit-block">
            <EnhanceMathQuillEdit
              mathExpression={mathExpression}
              handleInputExpression={handleInputExpression}
              edit={edit}
              getMq={getMq}
            />
          </div>
        </div>
      </div>
      <ul className="a">
        {KEY.map((v, i) => {
          return (
            <li className="b" key={i} onClick={(e) => handleClickKeyBoard(e, v)}>
              {v}
            </li>
          )
        })}
        <li className="b" onClick={handleKeyBoardDelete}>
          <div className="zzy-icon zzy-icon-delete b-icon" />
        </li>
      </ul>
      <div className="button">
        <img
          src={submitButton}
          alt="submit button"
          className="button-icon"
          onClick={handleSubmitAnswer}
        />
      </div>
    </div>
  )
}
export default PrimaryKeyBoard
