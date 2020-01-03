import React, { createContext, useReducer } from 'react'
import getAddNum from './expression'
import { applyMiddleware, IAction } from './middleware'
export interface IMathExpression {
  problemId: number
  answerMathExpression: string
  addend1: number
  addend2: number
  result: number
  expression: string
  resultExpression: string
}
export interface IAddition<T> {
  addMathExpression: T[]
  nextAddProblemId: number
  currentDoProblemId: number
}
export interface IInitState {
  addition: IAddition<IMathExpression>
}
const initMathExpression: IInitState = {
  addition: {
    addMathExpression: Array(10)
      .fill(1)
      .map((v, i: number) => {
        return {
          ...getAddNum(),
          problemId: i,
          answerMathExpression: ''
        }
      }),
    nextAddProblemId: 10,
    currentDoProblemId: 0
  }
}
type AppState = typeof initMathExpression
type Action =
  | {
      type: 'changeMathExpression'
      currentDoProblemId: number
      answerMathExpression: string
    }
  | { type: 'doNextMathExpression'; nextMathExpression: IMathExpression }
const mathExpressionReducer = (state: AppState, action: Action): AppState => {
  const { addMathExpression } = state.addition
  switch (action.type) {
    case 'changeMathExpression':
      return {
        ...state,
        addition: {
          ...state.addition,
          addMathExpression: addMathExpression.map(v => {
            if (v.problemId !== action.currentDoProblemId) return v
            return {
              ...v,
              answerMathExpression: action.answerMathExpression
            }
          })
        }
      }
    case 'doNextMathExpression':
      addMathExpression.push(action.nextMathExpression)
      return {
        ...state,
        addition: {
          ...state.addition,
          addMathExpression: [...addMathExpression],
          nextAddProblemId: state.addition.nextAddProblemId + 1,
          currentDoProblemId: state.addition.currentDoProblemId + 1
        }
      }
    default:
      return state
  }
}
export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState
  const enhanceDispatch = (action:IAction) => Promise.resolve(undefined)
  const prefixCls = 'zzy-deliberate-practice'
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
    enhanceDispatch,
    prefixCls
  })
  const Provider = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
    const enhanceDispatch = applyMiddleware<StateType, React.Dispatch<ActionType>>(state, dispatch)
    return <ctx.Provider value={{ state, dispatch, enhanceDispatch, prefixCls }} {...props} />
  }
  return [ctx, Provider] as const
}
const [MathExpressionContext, MathExpressionContextProvider] = createCtx(mathExpressionReducer, initMathExpression)
export { MathExpressionContext, MathExpressionContextProvider }
