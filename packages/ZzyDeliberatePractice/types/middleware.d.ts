export interface ICacheData<T> {
    data: T[];
    correctArr: number[];
}
export interface IAction {
    userAnswer: string;
    currentDoProblemId: number;
    type: string;
}
export declare const applyMiddleware: <T, V>(state: T, dispatch: V) => (action: IAction) => Promise<undefined>;
