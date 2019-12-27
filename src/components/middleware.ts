import getAddNum from '@/hooks/hooks'
import { IMathExpression } from './mathExpressionContext'
// TODO 应该使用 const => babel transform ts have problem
enum additionEnum {
  itemKey = 'addition'
}
export interface ICacheData<T> {
  data: T[]
  correctArr: number[]
}
type ICacheDataType = ICacheData<IMathExpression  & { isCorrect: boolean }>
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
export const applyMiddleware: <T, V>(
  state: T,
  dispatch: V
) => (action: IAction) => Promise<undefined> = (state: any, dispatch: any) => (
  action: any
) => {
  return new Promise((resolve, reject) => {
    try {
      // 从action中获取用户answer,当前题目索引
      const { userAnswer, currentDoProblemId } = action
      // 获取state里面数学表达式集合
      const { addition } = state
      // 获取答案是否正确
      const mathExpression = addition.addMathExpression.find(
        (v:IMathExpression) => v.problemId === currentDoProblemId
      )
      const isCorrect = mathExpression.resultExpression === userAnswer
      // 存用户题目
      if (getCacheLocationProblem(additionEnum.itemKey)) {
        const cacheData: ICacheDataType = getCacheLocationProblem(additionEnum.itemKey)
        cacheData.data = [...cacheData.data, { ...mathExpression, isCorrect }]
        cacheData.correctArr.push(Number(isCorrect))
        setCacheLocationProblem(additionEnum.itemKey, cacheData)
      } else {
        const cacheData: ICacheDataType = {
          data: [{ ...mathExpression, isCorrect }],
          correctArr: [Number(isCorrect)]
        }
        setCacheLocationProblem(additionEnum.itemKey, cacheData)
      }
      // 获取新题
      const getNewProblem = getAddNum()
      const enhanceAction = {
        ...action,
        nextMathExpression: {
          ...getNewProblem,
          problemId: state!.addition!.nextAddProblemId,
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
