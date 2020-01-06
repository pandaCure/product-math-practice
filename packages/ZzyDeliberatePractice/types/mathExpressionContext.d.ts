import React from 'react';
import { IAction } from './middleware';
export interface IMathExpression {
    problemId: number;
    answerMathExpression: string;
    addend1: number;
    addend2: number;
    result: number;
    expression: string;
    resultExpression: string;
}
export interface IAddition<T> {
    addMathExpression: T[];
    nextAddProblemId: number;
    currentDoProblemId: number;
}
export interface IInitState {
    addition: IAddition<IMathExpression>;
}
declare type Action = {
    type: 'changeMathExpression';
    currentDoProblemId: number;
    answerMathExpression: string;
} | {
    type: 'doNextMathExpression';
    nextMathExpression: IMathExpression;
};
export declare function createCtx<StateType, ActionType>(reducer: React.Reducer<StateType, ActionType>, initialState: StateType): readonly [React.Context<{
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
    enhanceDispatch: (action: IAction) => Promise<undefined>;
    prefixCls: string;
}>, (props: {
    children?: React.ReactNode;
}) => JSX.Element];
declare const MathExpressionContext: React.Context<{
    state: IInitState;
    dispatch: React.Dispatch<Action>;
    enhanceDispatch: (action: IAction) => Promise<undefined>;
    prefixCls: string;
}>, MathExpressionContextProvider: (props: {
    children?: React.ReactNode;
}) => JSX.Element;
export { MathExpressionContext, MathExpressionContextProvider };
