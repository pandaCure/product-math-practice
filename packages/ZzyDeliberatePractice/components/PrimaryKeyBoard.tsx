import React, { useState, useContext, useEffect, useRef, useCallback } from 'react'
import classnames from 'classnames'
import submitButton from '../asserts/submit-button.png'
import EnhanceMathQuillEdit from 'enhance-mathquill-edit'
import { MathFieldReturn } from 'mathquillloader'
import { MathExpressionContext } from '../mathExpressionContext'
const KEY = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
const operationStrMatch = /[^\d]+/
const operationNumMatch = /[\d|\.]+/
const PrimaryKeyBoard = () => {
  const [edit, setEdit] = useState(true)
  const [limitInput, setLimitInput] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [mq, setMq] = useState<MathFieldReturn|null>(null)
  const [mathExpression, setMathExpression] = useState({ key: '' })
  const { dispatch, enhanceDispatch, state, prefixCls } = useContext(
    MathExpressionContext
  )
  const deleteFlag = useRef<boolean | null>(false)
  const cacheCurrentDoIndex = useRef<number>(0)
  const handleClickKeyBoard = (e: any, key: any) => {
    e.stopPropagation()
    setEdit(true)
    !limitInput && setMathExpression({ key })
  }
  const handleInputExpression = (
    latex: string,
    mathField: MathFieldReturn
  ) => {
    if (!latex && !deleteFlag!.current) return false
    // TODO XSS攻击过滤
    const matchNumber = latex.replace(/\s/g, '').match(operationNumMatch)
    const matchString = latex.replace(/\s/g, '').match(operationStrMatch)
    const limitInputPre = (matchNumber && matchNumber[0]!.length > 2) || (matchString && matchString[0]!.length > 4)
    const limitInputPrev = (matchNumber && matchNumber[0]!.length > 3) || (matchString && matchString[0]!.length > 5)
    if (limitInputPre) {
      setLimitInput(true)
      mathField.keystroke('Enter')
      mathField.blur()
    }
    if (limitInputPrev) return false
    setUserAnswer(latex)
    deleteFlag.current = false
  }
  useEffect(() => {
    if (cacheCurrentDoIndex!.current === state.currentDoProblemId) {
      dispatch({
        type: 'changeMathExpression',
        answerMathExpression: userAnswer,
        currentDoProblemId: state.currentDoProblemId
      })
    }
  }, [dispatch, state.currentDoProblemId, userAnswer])
  const EditExpression = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!limitInput) {
      setEdit(true)
      mq!.blur()
    } else {
      mq!.blur()
    }
  }
  const cancelEditExpression = () => {
    setMathExpression({ key: '' })
    setEdit(false)
  }
  const getMq = (mq: MathFieldReturn) => setMq(mq)
  const handleSubmitAnswer = useCallback(() => {
    // TODO 提示必填 否则进入不了下一题
    if (!userAnswer) return false
    enhanceDispatch({
      currentDoProblemId: state.currentDoProblemId,
      userAnswer,
      type: 'doNextMathExpression'
    }).then(data => {
      // 下一步题处理
      setEdit(true)
      mq!.latex('')
      mq!.blur()
      setUserAnswer('')
      cacheCurrentDoIndex!.current++
      setLimitInput(false)
    })
  }, [enhanceDispatch, mq, state.currentDoProblemId, userAnswer])
  const handleKeyBoardDelete = (e: React.MouseEvent) => {
    mq!.moveToRightEnd()
    deleteFlag.current = true
    e.stopPropagation()
    setLimitInput(false)
    setEdit(true)
    mq!.keystroke('Backspace')
    mq!.moveToRightEnd()
    mq!.blur()
  }
  useEffect(() => {
    const handleKeyword = (e: KeyboardEvent) => {
      if (limitInput) return false
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        e.keyCode >= 48 && setMathExpression({ key: String(e.keyCode - 48) })
      } else if (e.keyCode >= 96 && e.keyCode <= 103) {
        e.keyCode >= 96 && setMathExpression({ key: String(e.keyCode - 96) })
      } else if (e.keyCode === 190) {
        setMathExpression({ key: '.' })
      } else if (e.keyCode === 13) {
        if (mq!.latex()) handleSubmitAnswer()
      }
    }
    window.addEventListener('keyup', handleKeyword, false)
    return () => window.removeEventListener('keyup', handleKeyword, false)
  }, [handleSubmitAnswer, mq])
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
              onClick={(e) => handleClickKeyBoard(e, v)}
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
              `${prefixCls}-icon`,
              `${prefixCls}-icon-delete`,
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
