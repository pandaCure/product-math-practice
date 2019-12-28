import React from 'react';
import * as traverseTypes from '@babel/traverse';
export interface IEnhanceMathQuillNoEdit {
    mathExpression: string;
    traverseOpts?: traverseTypes.TraverseOptions;
}
declare const EnhanceMathQuillNoEdit: React.FC<IEnhanceMathQuillNoEdit>;
export default EnhanceMathQuillNoEdit;
