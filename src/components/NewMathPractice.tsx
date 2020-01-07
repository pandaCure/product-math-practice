import React from 'react'
import PrimaryKeyBoard from '@/components/PrimaryKeyBoard/PrimaryKeyBoard'
import './style.scss'
import {
  MathExpressionContextProvider,
  stateMap
} from './mathExpressionContext'
import ShowQuestion from '@/components/ShowQuestion/ShowQuestion'
const baseCss = 'zzy-deliberate-practice'
const NewMathPractice = ({ types = 'addState' }) => {
  // TODO 进场图片加载动画需要吗
  return (
    <MathExpressionContextProvider initialPropsState={stateMap.get(types)}>
      <div className="zzy-container">
        <ShowQuestion />
        <PrimaryKeyBoard />
      </div>
    </MathExpressionContextProvider>
  )
}
export default NewMathPractice
