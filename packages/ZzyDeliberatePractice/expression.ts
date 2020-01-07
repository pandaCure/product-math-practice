type IGetRandom = (minNum: number, maxNum: number) => number
const getRandom: IGetRandom = (minNum, maxNum) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}
export interface IMathExpressionResult {
  firstNumber: number
  secondNumber: number
  result: number
  expression: string
  resultExpression: string
}
const getAddendMathExpression: () => IMathExpressionResult = () => {
  const num1Tens: number = getRandom(1, 8)
  const num1Ones: number = getRandom(1, 8)
  const num2Tens: number = getRandom(1, 9 - num1Tens)
  const num2Ones: number = getRandom(1, 9 - num1Ones)
  const addend1: number = num1Tens * 10 + num1Ones
  const addend2: number = num2Tens * 10 + num2Ones
  const result = addend1 + addend2
  return {
    firstNumber: addend1,
    secondNumber: addend2,
    result,
    expression: `${addend1}+${addend2}=`,
    resultExpression: `${result}`
  }
}
const getSubtractionMathExpression: () => IMathExpressionResult = () => {
  const num1Tens = getRandom(2, 9)
  const num1Ones = getRandom(2, 9)
  const num2Tens = getRandom(1, num1Tens)
  const num2Ones = getRandom(1, num1Ones)
  const sub1 = num1Tens * 10 + num1Ones
  const sub2 = num2Tens * 10 + num2Ones
  const result = sub1 - sub2
  return {
    firstNumber: sub1,
    secondNumber: sub2,
    result,
    resultExpression: `${result}`,
    expression: `${sub1}-${sub2}=`
  }
}
const getMultiplicationMathExpression: () => IMathExpressionResult = () => {
  const num1Ones = getRandom(1, 9)
  const num2Ones = getRandom(1, 9)
  const result = num1Ones * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result,
    resultExpression: `${result}`,
    expression: `${num1Ones}\\times${num2Ones}=`
  }
}
const getDivisionMathExpression: () => IMathExpressionResult = () => {
  const result = getRandom(1, 9)
  const num2Ones = getRandom(1, 9)
  const num1Ones = result * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result,
    resultExpression: `${result}`,
    expression: `${num1Ones}\\div${num2Ones}=`
  }
}
const computerMathMap = new Map<string, () => IMathExpressionResult>()
computerMathMap.set('getAddendMathExpression', getAddendMathExpression)
computerMathMap.set('getSubtractionMathExpression', getSubtractionMathExpression)
computerMathMap.set('getMultiplicationMathExpression', getMultiplicationMathExpression)
computerMathMap.set('getDivisionMathExpression', getDivisionMathExpression)
enum ComputerMathMapEnum {
  getAddendMathExpression = 'getAddendMathExpression',
  getSubtractionMathExpression = 'getSubtractionMathExpression',
  getMultiplicationMathExpression = 'getMultiplicationMathExpression',
  getDivisionMathExpression = 'getDivisionMathExpression'
}
export {
  computerMathMap,
  ComputerMathMapEnum
}
