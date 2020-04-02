import React, { useContext } from 'react'
import PrimaryKeyBoard from './components/PrimaryKeyBoard'
import {
  MathExpressionContextProvider,
  MathExpressionContext,
  stateMap
} from './mathExpressionContext'
import ShowQuestion from './components/ShowQuestion'
type propsType =
  | 'subStateLevel1'
  | 'addStateLevel1'
  | 'mulStateLevel1'
  | 'divStateLevel1'
  | 'subStateLevel2'
  | 'addStateLevel2'
  | 'mulStateLevel2'
  | 'divStateLevel2'
interface IZP {
  types: propsType
}
const ZzyDeliberatePractice: React.FC<IZP> = ({ types }) => {
  // TODO 进场图片加载动画需要吗
  const { prefixCls } = useContext(MathExpressionContext)
  return (
    <MathExpressionContextProvider initialPropsState={stateMap.get(types)}>
      <div className={`${prefixCls}-container`}>
        <ShowQuestion />
        <PrimaryKeyBoard />
      </div>
    </MathExpressionContextProvider>
  )
}
export default ZzyDeliberatePractice
