import React from 'react';
export interface IKatexMathDiv {
    mathExpression: string;
    answerMathExpression: string;
    changeBorderColor: boolean;
}
declare const KatexMathDiv: React.FC<IKatexMathDiv>;
export default KatexMathDiv;
