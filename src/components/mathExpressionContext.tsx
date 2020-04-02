import React, { createContext, useReducer, useContext } from 'react'
import {
  computerMathMap,
  ComputerMathMapEnum,
  IMathExpressionResult
} from '@/hooks'
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
}
export type IInitState = IAddition<IMathExpressionType>
const initMathExpression: (key: string) => IInitState = key => {
  return {
    mathExpression: Array(10)
      .fill(1)
      .map((v: number, i: number) => {
        return {
          ...computerMathMap.get(key)!(),
          problemId: i,
          answerMathExpression: ''
        }
      }),
    nextAddProblemId: 10,
    currentDoProblemId: 0,
    mathExpressionType: key
  }
}
const addStateLevel1 = initMathExpression(ComputerMathMapEnum.getAddendMathExpressionLevel1)
const subStateLevel1 = initMathExpression(
  ComputerMathMapEnum.getSubtractionMathExpressionLevel1
)
const mulStateLevel1 = initMathExpression(
  ComputerMathMapEnum.getMultiplicationMathExpressionLevel1
)
const divStateLevel1 = initMathExpression(
  ComputerMathMapEnum.getDivisionMathExpressionLevel1
)
const addStateLevel2 = initMathExpression(ComputerMathMapEnum.getAddendMathExpressionLevel2)
const subStateLevel2 = initMathExpression(
  ComputerMathMapEnum.getSubtractionMathExpressionLevel2
)
const mulStateLevel2 = initMathExpression(
  ComputerMathMapEnum.getMultiplicationMathExpressionLevel2
)
const divStateLevel2 = initMathExpression(
  ComputerMathMapEnum.getDivisionMathExpressionLevel2
)
type AppState = IInitState
type Action =
  | {
      type: 'changeMathExpression'
      currentDoProblemId: number
      answerMathExpression: string
    }
  | {
      type: 'doNextMathExpression'
      nextMathExpression: {
        problemId: number
        answerMathExpression: string
        firstNumber: number
        secondNumber: number
        result: number
        expression: string
        resultExpression: string
      }
    }
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
  const Provider = (
    props: React.PropsWithChildren<{ initialPropsState: StateType }>
  ) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
      reducer,
      props.initialPropsState
    )
    // TODO 怎么处理 typeof
    const enhanceDispatch = applyMiddleware(
      (state as unknown) as IInitState,
      dispatch
    )
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
  subStateLevel1
)
const stateMap = new Map<string, IInitState>()
stateMap.set('subStateLevel1', subStateLevel1)
stateMap.set('addStateLevel1', addStateLevel1)
stateMap.set('mulStateLevel1', mulStateLevel1)
stateMap.set('divStateLevel1', divStateLevel1)
stateMap.set('subStateLevel2', subStateLevel2)
stateMap.set('addStateLevel2', addStateLevel2)
stateMap.set('mulStateLevel2', mulStateLevel2)
stateMap.set('divStateLevel2', divStateLevel2)
export { MathExpressionContext, MathExpressionContextProvider, stateMap }
// TODO typescript 疑问
/**
 * 1 - 类型覆盖程度到多少
 * 2 - 关于useReducer 增强的 返回值 类型 推断
 * 3 - 怎么使用自定义types
 * 4 - 关于react state使用默认值的限制
 * */
