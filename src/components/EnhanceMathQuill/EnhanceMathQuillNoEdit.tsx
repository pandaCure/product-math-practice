import React, { useMemo } from 'react'
import { MathQuill, MathFieldReturn } from './MathQuillLoader'
import { parse, traverse, NodePath } from '@babel/core'
import generator from '@babel/generator'
import * as t from '@babel/types'
export interface IEnhanceMathQuillNoEdit {
  mathExpression: string
}
const EnhanceMathQuillNoEdit: React.FC<IEnhanceMathQuillNoEdit> = ({
  mathExpression
}) => {
  const html = useMemo(() => {
    // TODO createDocumentFragment需要优化吗
    const mq = MathQuill.MathField(document.createElement('div'))
    mq.write(mathExpression)
    const ast = parse(mq.el().outerHTML, {
      parserOpts: {
        sourceType: 'module',
        plugins: ['jsx']
      }
    }) as t.File
    traverse(ast, {
      JSXAttribute: {
        exit: (nodePath: NodePath<t.JSXAttribute>) => {
          const attrNode = nodePath.node.value
          if (
            t.isStringLiteral(attrNode) &&
            attrNode.value === 'mq-editable-field mq-math-mode'
          ) {
            nodePath.insertAfter(
              t.jsxAttribute(
                t.jsxIdentifier('style'),
                t.stringLiteral("font-family: 'DIN' !important;")
              )
            )
          }
        }
      }
    })
    return generator(ast).code.replace(/\;$/, '')
  }, [mathExpression])
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}
export default EnhanceMathQuillNoEdit
