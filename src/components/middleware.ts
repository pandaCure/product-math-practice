import {computerMathMap} from '@/hooks/hooks'
import { IMathExpressionType, IInitState } from './mathExpressionContext'
// TODO 应该使用 const => babel transform ts have problem
enum MathRecordKeyEnum {
  itemKey = 'record-user-do-problem'
}
export interface ICacheData<T> {
  data: T[]
  correctArr: number[]
}
type ICacheDataType = ICacheData<IMathExpressionType  & { isCorrect: boolean }>
const getCacheLocationProblem = (name: string) => {
  const cacheProblem = window.localStorage.getItem(name)
  return !cacheProblem ? false : JSON.parse(cacheProblem)
}
const clearCacheLocationProblem = () => window.localStorage.clear()
const setCacheLocationProblem = (
  name: string,
  data: ICacheDataType
) => {
  return window.localStorage.setItem(name, JSON.stringify(data))
}
export interface IAction {
  userAnswer: string
  currentDoProblemId: number
  type: string
}
export const applyMiddleware: <T extends IInitState, V>(
  state: T,
  dispatch: V
) => (action: IAction) => Promise<undefined> = (state, dispatch) => (
  action
) => {
  return new Promise((resolve, reject) => {
    try {
      // 从action中获取用户answer,当前题目索引
      const { userAnswer, currentDoProblemId } = action
      // 获取state里面数学表达式集合
      const { mathExpression } = state
      // 获取答案是否正确
      const mathAnswerExpression = mathExpression.find(
        (v:IMathExpressionType) => v.problemId === currentDoProblemId
      )
      const isCorrect = mathAnswerExpression.resultExpression === userAnswer
      // 存用户题目
      if (getCacheLocationProblem(MathRecordKeyEnum.itemKey)) {
        const cacheData: ICacheDataType = getCacheLocationProblem(MathRecordKeyEnum.itemKey)
        cacheData.data = [...cacheData.data, { ...mathAnswerExpression, isCorrect }]
        cacheData.correctArr.push(Number(isCorrect))
        setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData)
      } else {
        const cacheData: ICacheDataType = {
          data: [{ ...mathAnswerExpression, isCorrect }],
          correctArr: [Number(isCorrect)]
        }
        setCacheLocationProblem(MathRecordKeyEnum.itemKey, cacheData)
      }
      // 获取新题
      const getNewProblem = computerMathMap.get(state.mathExpressionType)!()
      const enhanceAction = {
        ...action,
        nextMathExpression: {
          ...getNewProblem,
          problemId: state!.nextAddProblemId,
          answerMathExpression: ''
        }
      }
      // TODO 返回值？
      resolve(dispatch(enhanceAction))
      console.log(state)
    } catch (e) {
      reject(e)
    }
  })
}
