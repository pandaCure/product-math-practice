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
const getAddendMathExpressionLevel2: () => IMathExpressionResult = () => {
  const num1: number = getRandom(1, 8)
  const num2: number = getRandom(2, 8)
  const num3: number = getRandom(1, 9 - num1)
  const num4: number = getRandom(10 - num2, 9)
  const addend1: number = num1 * 10 + num2
  const addend2: number = num3 * 10 + num4
  const result = addend1 + addend2
  return {
    firstNumber: addend1,
    secondNumber: addend2,
    result,
    expression: `${addend1}+${addend2}=`,
    resultExpression: `${result}`
  }
}
const getSubtractionMathExpressionLevel2: () => IMathExpressionResult = () => {
  const num1Tens = getRandom(2, 9)
  const num1Ones = getRandom(0, 8)
  const num2Tens = getRandom(1, num1Tens)
  const num2Ones = getRandom(num1Ones + 1, 9)
  const sub1 = num1Tens * 10 + num1Ones
  const sub2 = num2Tens * 10 + num2Ones
  const result = sub1 - sub2
  return {
    firstNumber: sub1,
    secondNumber: sub2,
    result,
    resultExpression: `${result}`,
    expression: `${sub1}-${sub2}`
  }
}
const getMultiplicationMathExpressionLevel2: () => IMathExpressionResult = () => {
  const num1Ones = getRandom(1, 4)
  const num1Tens = getRandom(1, 9)
  const num2Ones = getRandom(1, Math.floor(10/num1Ones))
  const result = (num1Tens * 10 + num1Ones) * num2Ones
  const value = num1Tens * 10 + num1Ones
  return {
    firstNumber: value,
    secondNumber: num2Ones,
    result,
    resultExpression: `${result}`,
    expression: `${value}\\times${num2Ones}`
  }
}
const getDivisionMathExpressionLevel2: () => IMathExpressionResult = () => {
  const num2Ones = getRandom(2, 4)
  const result1Tens = getRandom(1, Math.floor(10/num2Ones))
  const result1Ones = getRandom(1, Math.floor(10/num2Ones))
  const result = result1Tens * 10 + result1Ones
  const num1Ones = result * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result,
    resultExpression: `${result}`,
    expression: `${num1Ones}\\div${num2Ones}`
  }
}
export {
  getAddendMathExpressionLevel2,
  getSubtractionMathExpressionLevel2,
  getMultiplicationMathExpressionLevel2,
  getDivisionMathExpressionLevel2
}