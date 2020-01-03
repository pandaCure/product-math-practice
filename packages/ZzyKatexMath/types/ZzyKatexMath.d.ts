import React, { ReactNode } from "react";
import katex from "katex";
import * as traverseTypes from "@babel/traverse";
export interface IKatexMath {
    mathExpression: string;
    children?: ReactNode;
    handleKatexError: (err: string) => any;
    cssClass?: string;
    traverseOpts?: traverseTypes.TraverseOptions;
}
declare const KatexMath: React.FC<katex.IKatexMathProps & IKatexMath>;
export default KatexMath;
