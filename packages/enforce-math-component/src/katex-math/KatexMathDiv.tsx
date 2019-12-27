import React from 'react'
import KatexMath from './KatexMath'
import EnhanceMathQuill from '@/components/EnhanceMathQuill/EnhanceMathQuillNoEdit'
const KatexMathDiv = () => {
  return (
    <div className="question">
      <KatexMath mathExpression="1+2=" handleKatexError={() => {}}/>
      <div className="answer">
        <EnhanceMathQuill mathExpression="3"/>
      </div>
    </div>
  )
}

export default KatexMathDiv