import React from 'react'
import PrimaryKeyBoard from '@/components/PrimaryKeyBoard/PrimaryKeyBoard'
import './style.scss'
import {
  MathExpressionContextProvider,
  stateMap
} from './mathExpressionContext'
import ShowQuestion from '@/components/ShowQuestion/ShowQuestion'
import PropTypes, { InferProps, InferType } from 'prop-types'
const baseCss = 'zzy-deliberate-practice'
const propTypes = {
  types: PropTypes.oneOf(['addState', 'divState', 'mulState', 'subState'])
    .isRequired
}
const NewMathPractice: React.SFC<InferType<typeof propTypes>> = ({
  types = 'addState'
}) => {
  // TODO 进场图片加载动画需要吗
  const value = stateMap.get(types)
  return value ? (
    <MathExpressionContextProvider initialPropsState={value}>
      <div className="zzy-container">
        <ShowQuestion />
        <PrimaryKeyBoard />
      </div>
    </MathExpressionContextProvider>
  ) : null
}
NewMathPractice.propTypes = propTypes
export default NewMathPractice
