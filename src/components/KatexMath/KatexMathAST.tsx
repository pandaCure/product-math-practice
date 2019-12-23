import React, { useMemo } from "react";
import KatexMath from "./KatexMath";
import * as t from "@babel/types";
import { NodePath } from "@babel/core";
import answerImage from "@/asserts/answer-bg.svg";
const astDOM = t.jsxElement(
  t.jsxOpeningElement(
    t.jsxIdentifier("span"),
    [
      t.jsxAttribute(t.jsxIdentifier("class"), t.stringLiteral("base")),
      t.jsxAttribute(
        t.jsxIdentifier("style"),
        t.stringLiteral(
          `background-image: url(${answerImage});background-size: 100%;background-repeat: no-repeat;width: ${54 /
            28}em;height: ${32 / 28}em;line-height: ${32 /
            28}em;text-align:center;margin-left:0.2777777777777778em;`
        )
      )
    ],
    false
  ),
  t.jsxClosingElement(t.jsxIdentifier("span")),
  [t.jsxText("3")],
  false
);
const KatexMathAST = () => {
  const traverseOpts = useMemo(() => {
    return {
      JSXAttribute(nodePath: NodePath<t.JSXAttribute>) {
        const attrNode = nodePath.node.value;
        if (t.isStringLiteral(attrNode) && attrNode.value === "katex-html") {
          const node = nodePath.findParent((path: NodePath<t.Node>) =>
            t.isJSXElement(path)
          );
          node.pushContainer("children", [astDOM]);
        }
      }
    };
  }, []);
  return (
    <KatexMath
      traverseOpts={traverseOpts}
      mathExpression="1+2="
      handleKatexError={() => {}}
    />
  );
};
export default KatexMathAST;
