import React, {useContext} from 'react'
import PrimaryKeyBoard from './PrimaryKeyBoard'
import {MathExpressionContextProvider, MathExpressionContext} from './mathExpressionContext'
import ShowQuestion from './components/ShowQuestion'
const ZzyDeliberatePractice = () => {
  // TODO 进场图片加载动画需要吗
  const {prefixCls} = useContext(MathExpressionContext)
  return (
    <MathExpressionContextProvider>
      <div className={`${prefixCls}-container`}>
        <ShowQuestion />
        <PrimaryKeyBoard />
      </div>
    </MathExpressionContextProvider>
  )
}
export default ZzyDeliberatePractice