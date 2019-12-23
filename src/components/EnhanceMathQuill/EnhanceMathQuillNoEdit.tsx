import React, {useRef, useMemo} from 'react'
import {MathQuill, MQ} from './MathQuillLoader'
export interface IEnhanceMathQuillNoEdit {
  mathExpression: string
}
const EnhanceMathQuillNoEdit:React.FC<IEnhanceMathQuillNoEdit> = ({mathExpression}) => {
  const ele = useRef<HTMLDivElement>(document.createElement('div'))
  const html = useMemo(() => {
    if (ele!.current) {
      const mq = MathQuill.MathField(ele.current)
      mq.write(mathExpression)
      return mq.html()
    }
  }, [mathExpression])
  return <span dangerouslySetInnerHTML={{ __html: html }}/>
}
export default EnhanceMathQuillNoEdit