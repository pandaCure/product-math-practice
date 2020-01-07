import React, { createContext, useReducer } from 'react'
import {
  computerMathMap,
  ComputerMathMapEnum,
  IMathExpressionResult
} from './expression'
import { applyMiddleware, IAction } from './middleware'
// TODO code splite
interface IMathExpression {
  problemId: number
  answerMathExpression: string
}
export type IMathExpressionType = IMathExpression &
  Readonly<IMathExpressionResult>
export interface IAddition<T> {
  mathExpression: T[]
  nextAddProblemId: number
  currentDoProblemId: number
  mathExpressionType: string
}
export type IInitState = IAddition<IMathExpressionType>
const initMathExpression: (key: string) => IInitState = key => {
  const fun = computerMathMap.get(key)
  if (!fun)
    return {
      mathExpression: [],
      nextAddProblemId: 0,
      currentDoProblemId: 0,
      mathExpressionType: key
    }
  return {
    mathExpression: Array(10)
      .fill(1)
      .map((v: number, i: number) => {
        return {
          ...fun(),
          problemId: i,
          answerMathExpression: ''
        }
      }),
    nextAddProblemId: 10,
    currentDoProblemId: 0,
    mathExpressionType: key
  }
}
const addState = initMathExpression(ComputerMathMapEnum.getAddendMathExpression)
const subState = initMathExpression(
  ComputerMathMapEnum.getSubtractionMathExpression
)
const mulState = initMathExpression(
  ComputerMathMapEnum.getMultiplicationMathExpression
)
const divState = initMathExpression(
  ComputerMathMapEnum.getDivisionMathExpression
)
type AppState = IInitState
type Action =
  | {
      type: 'changeMathExpression'
      currentDoProblemId: number
      answerMathExpression: string
    }
  | { type: 'doNextMathExpression'; nextMathExpression: IMathExpressionType }
const mathExpressionReducer = (state: AppState, action: Action): AppState => {
  const { mathExpression } = state
  switch (action.type) {
    case 'changeMathExpression':
      return {
        ...state,
        mathExpression: mathExpression.map(v => {
          if (v.problemId !== action.currentDoProblemId) return v
          return {
            ...v,
            answerMathExpression: action.answerMathExpression
          }
        })
      }
    case 'doNextMathExpression':
      mathExpression.push(action.nextMathExpression)
      return {
        ...state,
        mathExpression: [...mathExpression],
        nextAddProblemId: state.nextAddProblemId + 1,
        currentDoProblemId: state.currentDoProblemId + 1
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
  const enhanceDispatch = (action: IAction) => Promise.resolve(undefined)
  const prefixCls = 'zzy-deliberate-practice'
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
    enhanceDispatch,
    prefixCls
  })
  const Provider = (props: React.PropsWithChildren<{[props: string]: any}>) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
      reducer,
      props.initialPropsState
    )
    const enhanceDispatch = applyMiddleware<
      StateType,
      React.Dispatch<ActionType>
    >(state, dispatch)
    return (
      <ctx.Provider
        value={{ state, dispatch, enhanceDispatch, prefixCls }}
        {...props}
      />
    )
  }
  return [ctx, Provider] as const
}
const [MathExpressionContext, MathExpressionContextProvider] = createCtx(
  mathExpressionReducer,
  subState
)
const stateMap = new Map<string, IInitState>()
stateMap.set('subState', subState)
stateMap.set('addState', addState)
stateMap.set('mulState', mulState)
stateMap.set('divState', divState)
export { MathExpressionContext, MathExpressionContextProvider, stateMap }
