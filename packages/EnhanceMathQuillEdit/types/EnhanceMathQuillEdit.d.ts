/// <reference types="react" />
import { MathFieldReturn } from 'mathquillloader';
import { NodePath } from '@babel/core';
import * as t from '@babel/types';
export interface IEnhanceMathQuillEdit {
    mathExpression: {
        key: string;
    };
    handleInputExpression: (mathExpression: string, mathField: MathFieldReturn) => void;
    edit: boolean;
    getMq: (mathField: MathFieldReturn) => void;
}
declare const defaultProps: {
    traverseOpts: {
        JSXAttribute(nodePath: NodePath<t.JSXAttribute>): void;
    };
    style: {
        fontFamily: string;
    };
};
declare type defaultPropsType = typeof defaultProps;
declare type IEnhanceMathQuillEditType = IEnhanceMathQuillEdit & Partial<defaultPropsType>;
declare const EnhanceMathQuillEdit: {
    (props: IEnhanceMathQuillEditType): JSX.Element;
    defaultProps: {
        traverseOpts: {
            JSXAttribute(nodePath: NodePath<t.JSXAttribute>): void;
        };
        style: {
            fontFamily: string;
        };
    };
};
export default EnhanceMathQuillEdit;
