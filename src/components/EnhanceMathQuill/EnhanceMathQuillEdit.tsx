import React, { useRef, useEffect, useCallback, useState } from 'react'
import { MathQuill, MQ, MathFieldReturn } from './MathQuillLoader'
import { parse, traverse, NodePath } from '@babel/core'
import generator from '@babel/generator'
import * as traverseTypes from '@babel/traverse'
import * as t from '@babel/types'
export interface IEnhanceMathQuillEdit {
  mathExpression: {key: string}
  handleInputExpression: (mathExpression: string, mathField: any) => any,
  edit: boolean,
  getMq: (mathField: any) => any
}
const EnhanceMathQuillEdit: React.FC<IEnhanceMathQuillEdit> = ({
  mathExpression,
  handleInputExpression,
  getMq,
  edit
}) => {
  const [katexRenderString, setKatexRenderString] = useState('')
  const ele = useRef<HTMLSpanElement>(null)
  const cacheMQ = useRef<MathFieldReturn | null>(null)
  useEffect(() => {
    if (ele!.current) {
      const mq = MathQuill.MathField(ele.current, {
        handlers: {
          edit: (mathField: any) => {
            handleInputExpression(mathField.latex(), mathField)
          }
        }
      })
      cacheMQ.current = mq
      getMq(mq)
    }
  }, [])
  useEffect(() => {
    if (cacheMQ!.current) {
      const mq = cacheMQ.current
      mq.write(mathExpression.key)
      const ast = parse(mq.el().outerHTML, {
        parserOpts: {
          sourceType: "module",
          plugins: ["jsx"]
        }
      }) as t.File;
      traverse(ast, {
        JSXAttribute(nodePath: NodePath<t.JSXAttribute>) {
          const attrNode = nodePath.node.value;
          if (t.isStringLiteral(attrNode) && attrNode.value === "mq-editable-field mq-math-mode") {
            const node = nodePath.getAllNextSiblings()
            console.log(node)
            node.forEach(v => v.replaceWith(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'Keyword' !important; opacity: 1"))))
          }
        }
      });
      // return generator(ast).code.replace(/\;$/, '');
      setKatexRenderString(generator(ast).code.replace(/\;$/, ''))
    }
  }, [mathExpression])
  return (
    <div className="edit-block">
      <span ref={ele} style={{position: "absolute", zIndex: edit ? 1 : -1, fontFamily: "Keyword", opacity: edit ? 1 :  0}}/>
      <span dangerouslySetInnerHTML={{ __html: katexRenderString }} style={{position: "absolute", zIndex: edit ? -1 : 1, opacity: edit ? 0 :  1}}/>
    </div>
  )
}
export default EnhanceMathQuillEdit
