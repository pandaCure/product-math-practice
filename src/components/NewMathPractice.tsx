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
// TODO:去掉这个没必要
const propTypes = {
  types: PropTypes.oneOf([
    'addStateLevel1',
    'addStateLevel2',
    'divStateLevel1',
    'divStateLevel2',
    'mulStateLevel1',
    'mulStateLevel2',
    'subStateLevel1',
    'subStateLevel2'
  ]).isRequired
}
const NewMathPractice: React.SFC<InferType<typeof propTypes>> = ({
  types = 'addStateLevel1'
}) => {
  // TODO 进场图片加载动画需要吗
  const value = stateMap.get(types)
  console.log(stateMap.keys())
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
