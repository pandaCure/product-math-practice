import React, {useRef, useEffect} from 'react'
import {MathQuill, MQ} from './MathQuillLoader'
export interface IEnhanceMathQuillEdit {
  mathExpression: string
  handleInputExpression: (mathExpression:string, mathField:any) => any
}
const EnhanceMathQuillEdit:React.FC<IEnhanceMathQuillEdit> = ({mathExpression, handleInputExpression}) => {
  const ele = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (ele!.current) {
      const mq = MathQuill.MathField(ele.current, {
        edit: (mathField:any) => {
          console.log(mathField.latex())
          handleInputExpression(mathField.latex(), mathField)
        }
      })
      mq.write(mathExpression)
    }
  }, [])
  return <span ref={ele} />
}
export default EnhanceMathQuillEdit