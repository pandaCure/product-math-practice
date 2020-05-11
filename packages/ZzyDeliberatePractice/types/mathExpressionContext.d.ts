import React from 'react';
import { IMathExpressionResult } from './expression';
import { IAction } from './middleware';
interface IMathExpression {
    problemId: number;
    answerMathExpression: string;
}
export declare type IMathExpressionType = IMathExpression & Readonly<IMathExpressionResult>;
export interface IAddition<T> {
    mathExpression: T[];
    nextAddProblemId: number;
    currentDoProblemId: number;
    mathExpressionType: string;
}
export declare type IInitState = IAddition<IMathExpressionType>;
declare type Action = {
    type: 'changeMathExpression';
    currentDoProblemId: number;
    answerMathExpression: string;
} | {
    type: 'doNextMathExpression';
    nextMathExpression: IMathExpressionType;
};
export declare function createCtx<StateType, ActionType>(reducer: React.Reducer<StateType, ActionType>, initialState: StateType): readonly [React.Context<{
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
    enhanceDispatch: (action: IAction) => Promise<undefined>;
    prefixCls: string;
}>, (props: React.PropsWithChildren<{
    [props: string]: any;
}>) => JSX.Element];
declare const MathExpressionContext: React.Context<{
    state: IInitState;
    dispatch: React.Dispatch<Action>;
    enhanceDispatch: (action: IAction) => Promise<undefined>;
    prefixCls: string;
}>, MathExpressionContextProvider: (props: React.PropsWithChildren<{
    [props: string]: any;
}>) => JSX.Element;
declare const stateMap: Map<string, () => IInitState>;
export { MathExpressionContext, MathExpressionContextProvider, stateMap };
