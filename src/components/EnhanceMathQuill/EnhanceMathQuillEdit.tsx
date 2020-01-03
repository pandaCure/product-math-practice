import React, { useRef, useEffect, useCallback, useState, StyleHTMLAttributes } from 'react'
import { MathQuill, MQ, MathFieldReturn } from './MathQuillLoader'
import { parse, traverse, NodePath } from '@babel/core'
import generator from '@babel/generator'
import * as traverseTypes from '@babel/traverse'
import * as t from '@babel/types'
export interface IEnhanceMathQuillEdit {
  mathExpression: {key: string}
  handleInputExpression: (mathExpression: string, mathField: MathFieldReturn) => void
  edit: boolean
  getMq: (mathField: MathFieldReturn) => void
  traverseOpts?: traverseTypes.TraverseOptions
  style?: React.CSSProperties
}
const defaultProps = {
  traverseOpts: {
    JSXAttribute(nodePath: NodePath<t.JSXAttribute>) {
      const attrNode = nodePath.node.value;
      if (t.isStringLiteral(attrNode) && attrNode.value === "mq-editable-field mq-math-mode") {
        const node = nodePath.getAllNextSiblings()
        node.forEach(v => v.replaceWith(t.jsxAttribute(t.jsxIdentifier('style'), t.stringLiteral("font-family: 'Keyword' !important; opacity: 1"))))
      }
    }
  },
  style: {
    fontFamily: "Keyword"
  }
}
type IEnhanceMathQuillEditType = IEnhanceMathQuillEdit & typeof defaultProps
const EnhanceMathQuillEdit: React.FC<IEnhanceMathQuillEditType> = (props) => {
  const {
    mathExpression,
    handleInputExpression,
    getMq,
    edit,
    traverseOpts,
    style
  } = props
  const [katexRenderString, setKatexRenderString] = useState('')
  const ele = useRef<HTMLSpanElement>(null)
  const cacheMQ = useRef<MathFieldReturn | null>(null)
  useEffect(() => {
    if (ele!.current && !cacheMQ!.current) {
      const mq = MathQuill.MathField(ele.current, {
        handlers: {
          edit: (mathField: MathFieldReturn) => {
            handleInputExpression(mathField.latex(), mathField)
          }
        }
      })
      cacheMQ.current = mq
      getMq(mq)
    }
  }, [getMq, handleInputExpression])
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
        ...traverseOpts
      });
      // return generator(ast).code.replace(/\;$/, '');
      setKatexRenderString(generator(ast).code.replace(/\;$/, ''))
    }
  }, [mathExpression, traverseOpts])
  return (
    <>
      <span ref={ele} style={{...style, position: "absolute", zIndex: edit ? 1 : -1, opacity: edit ? 1 :  0}}/>
      <span dangerouslySetInnerHTML={{ __html: katexRenderString }} style={{position: "absolute", zIndex: edit ? -1 : 1, opacity: edit ? 0 :  1}}/>
    </>
  )
}
EnhanceMathQuillEdit.defaultProps = defaultProps
export default EnhanceMathQuillEdit
