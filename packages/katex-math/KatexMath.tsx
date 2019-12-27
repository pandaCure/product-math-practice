import React, { useMemo, ReactNode } from "react";
import katex from "katex";
import { parse, traverse } from "@babel/core";
import generator from "@babel/generator";
import * as traverseTypes from "@babel/traverse"
import * as t from "@babel/types";
import classnames from "classnames";
export interface IKatexMath {
  mathExpression: string;
  children?: ReactNode;
  handleKatexError: (err: string) => any;
  classname?: string;
  traverseOpts?: traverseTypes.TraverseOptions
}
const KatexMath: React.FC<katex.IKatexMathProps & IKatexMath> = ({
  mathExpression,
  children,
  handleKatexError,
  classname,
  traverseOpts,
  ...reset
}) => {
  const katexRenderString: string = useMemo(() => {
    try {
      const handleMathExp = mathExpression.replace(/^<[^>]+?>$/, "");
      const mathHtml = katex.renderToString(handleMathExp, {
        throwOnError: true,
        ...reset
      });
      const ast = parse(mathHtml, {
        parserOpts: {
          sourceType: "module",
          plugins: ["jsx"]
        }
      }) as t.File;
      traverse(ast, {
        ...traverseOpts
      });
      return generator(ast).code.replace(/\;$/, '');
    } catch (err) {
      handleKatexError(err);
    }
    return "";
  }, [mathExpression, reset]);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: katexRenderString }}
      className={classnames("@zzy__katex-normal-style", classname)}
    />
  );
};

export default KatexMath;
