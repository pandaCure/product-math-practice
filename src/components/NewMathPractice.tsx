import React, {useReducer} from 'react'
import ReactDOM from 'react-dom'
import getAddNum from '@/hooks/hooks'
// import MathQuill from 'react-mathquill'
import EnhanceMathQuill from '@/components/EnhanceMathQuill/EnhanceMathQuillNoEdit'
// addMathquillStyles()
import Latex from 'react-latex'
import katex from 'katex'
import KatexMath from '@/components/KatexMath/KatexMath'
import KatexMathAST from '@/components/KatexMath/KatexMathAST'
import KatexMathDiv from '@/components/KatexMath/KatexMathDiv'
import PrimaryKeyBoard from '@/components/PrimaryKeyBoard/PrimaryKeyBoard'
import './style.scss'
import {MathExpressionContextProvider} from './mathExpressionContext'
import ShowQuestion from '@/components/ShowQuestion/ShowQuestion'
const NewMathPractice = () => {
  // console.log(katex.__renderToHTMLTree("1 + 2 ="));
  // console.log(katex.renderToString("1 + 2 ="));
  const expression = '\\cfrac{2}{1+\\cfrac{2}{1+\\cfrac{2}{1}}} = '
  const handleKatexError = (err: string) => console.log(err)
  // TODO 进场图片加载动画需要吗
  return (
    <MathExpressionContextProvider>
      <div className="zzy-container">
        <ShowQuestion />
        <PrimaryKeyBoard />
      </div>
    </MathExpressionContextProvider>
  )
}
export default NewMathPractice
