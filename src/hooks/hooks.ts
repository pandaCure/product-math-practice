interface IGetRandom {
  (minNum:number, maxNum:number): number
}
const getRandom:IGetRandom = (minNum, maxNum) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}
interface IAddendResult {
  addend1: number,
  addend2: number,
  result: number
}
type AddendResult = IAddendResult
interface IGetAddNum {
  (): AddendResult
}
const getAddNum:IGetAddNum = () => {
  const num1:number = getRandom(1, 8)
  const num2:number = getRandom(1, 8)
  const num3:number = getRandom(1, 9 - num1)
  const num4:number = getRandom(1, 9 - num2)
  const addend1: number = num1 * 10 + num2
  const addend2: number = num3 * 10 + num4
  const result = addend1 + addend2
  return {addend1, addend2, result}
}
export default getAddNum