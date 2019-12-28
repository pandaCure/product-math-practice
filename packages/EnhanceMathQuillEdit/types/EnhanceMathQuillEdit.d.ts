import React from 'react';
import { MathFieldReturn } from 'mathquillloader';
import { NodePath } from '@babel/core';
import * as traverseTypes from '@babel/traverse';
import * as t from '@babel/types';
export interface IEnhanceMathQuillEdit {
    mathExpression: {
        key: string;
    };
    handleInputExpression: (mathExpression: string, mathField: MathFieldReturn) => void;
    edit: boolean;
    getMq: (mathField: MathFieldReturn) => void;
    traverseOpts?: traverseTypes.TraverseOptions;
    style?: React.CSSProperties;
}
declare const defaultProps: {
    traverseOpts: {
        JSXAttribute(nodePath: NodePath<t.JSXAttribute>): void;
    };
    style: {
        fontFamily: string;
    };
};
declare type IEnhanceMathQuillEditType = IEnhanceMathQuillEdit & typeof defaultProps;
declare const EnhanceMathQuillEdit: React.FC<IEnhanceMathQuillEditType>;
export default EnhanceMathQuillEdit;
