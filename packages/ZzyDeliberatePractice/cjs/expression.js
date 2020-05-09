Object.defineProperty(exports, '__esModule', { value: true })
let getRandom = function(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}
let getAddendMathExpressionLevel1 = function() {
  let num1 = getRandom(1, 8)
  let num2 = getRandom(1, 8)
  let num3 = getRandom(1, 9 - num1)
  let num4 = getRandom(1, 9 - num2)
  let addend1 = num1 * 10 + num2
  let addend2 = num3 * 10 + num4
  let result = addend1 + addend2
  return {
    firstNumber: addend1,
    secondNumber: addend2,
    result: result,
    expression: addend1 + '+' + addend2 + '=',
    resultExpression: String(result)
  }
}
let getSubtractionMathExpressionLevel1 = function() {
  let num1Tens = getRandom(2, 9)
  let num1Ones = getRandom(2, 9)
  let num2Tens = getRandom(1, num1Tens)
  let num2Ones = getRandom(1, num1Ones)
  let sub1 = num1Tens * 10 + num1Ones
  let sub2 = num2Tens * 10 + num2Ones
  let result = sub1 - sub2
  return {
    firstNumber: sub1,
    secondNumber: sub2,
    result: result,
    resultExpression: String(result),
    expression: sub1 + '-' + sub2 + '='
  }
}
let getMultiplicationMathExpressionLevel1 = function() {
  let num1Ones = getRandom(1, 9)
  let num2Ones = getRandom(1, 9)
  let result = num1Ones * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result: result,
    resultExpression: String(result),
    expression: num1Ones + '\\times' + num2Ones + '='
  }
}
let getDivisionMathExpressionLevel1 = function() {
  let result = getRandom(1, 9)
  let num2Ones = getRandom(1, 9)
  let num1Ones = result * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result: result,
    resultExpression: String(result),
    expression: num1Ones + '\\div' + num2Ones + '='
  }
}
let getAddendMathExpressionLevel2 = function() {
  let num1 = getRandom(1, 8)
  let num2 = getRandom(2, 8)
  let num3 = getRandom(1, 9 - num1)
  let num4 = getRandom(10 - num2, 9)
  let addend1 = num1 * 10 + num2
  let addend2 = num3 * 10 + num4
  let result = addend1 + addend2
  return {
    firstNumber: addend1,
    secondNumber: addend2,
    result: result,
    expression: addend1 + '+' + addend2 + '=',
    resultExpression: String(result)
  }
}
let getSubtractionMathExpressionLevel2 = function() {
  let num1Tens = getRandom(2, 9)
  let num1Ones = getRandom(0, 8)
  let num2Tens = getRandom(1, num1Tens)
  let num2Ones = getRandom(num1Ones + 1, 9)
  let sub1 = num1Tens * 10 + num1Ones
  let sub2 = num2Tens * 10 + num2Ones
  let result = sub1 - sub2
  return {
    firstNumber: sub1,
    secondNumber: sub2,
    result: result,
    resultExpression: String(result),
    expression: sub1 + '-' + sub2 + '='
  }
}
let getMultiplicationMathExpressionLevel2 = function() {
  let num1Ones = getRandom(1, 4)
  let num1Tens = getRandom(1, 9)
  let num2Ones = getRandom(1, Math.floor(10 / num1Ones))
  let result = (num1Tens * 10 + num1Ones) * num2Ones
  let value = num1Tens * 10 + num1Ones
  return {
    firstNumber: value,
    secondNumber: num2Ones,
    result: result,
    resultExpression: String(result),
    expression: value + '\\times' + num2Ones + '='
  }
}
let getDivisionMathExpressionLevel2 = function() {
  let num2Ones = getRandom(2, 4)
  let result1Tens = getRandom(1, Math.floor(10 / num2Ones))
  let result1Ones = getRandom(1, Math.floor(10 / num2Ones))
  let result = result1Tens * 10 + result1Ones
  let num1Ones = result * num2Ones
  return {
    firstNumber: num1Ones,
    secondNumber: num2Ones,
    result: result,
    resultExpression: String(result),
    expression: num1Ones + '\\div' + num2Ones + '='
  }
}
let computerMathMap = new Map()
exports.computerMathMap = computerMathMap
computerMathMap.set(
  'getAddendMathExpressionLevel1',
  getAddendMathExpressionLevel1
)
computerMathMap.set(
  'getSubtractionMathExpressionLevel1',
  getSubtractionMathExpressionLevel1
)
computerMathMap.set(
  'getMultiplicationMathExpressionLevel1',
  getMultiplicationMathExpressionLevel1
)
computerMathMap.set(
  'getDivisionMathExpressionLevel1',
  getDivisionMathExpressionLevel1
)
computerMathMap.set(
  'getAddendMathExpressionLevel2',
  getAddendMathExpressionLevel2
)
computerMathMap.set(
  'getSubtractionMathExpressionLevel2',
  getSubtractionMathExpressionLevel2
)
computerMathMap.set(
  'getMultiplicationMathExpressionLevel2',
  getMultiplicationMathExpressionLevel2
)
computerMathMap.set(
  'getDivisionMathExpressionLevel2',
  getDivisionMathExpressionLevel2
)
let ComputerMathMapEnum
;(function(ComputerMathMapEnum) {
  ComputerMathMapEnum['getAddendMathExpressionLevel1'] =
    'getAddendMathExpressionLevel1'
  ComputerMathMapEnum['getSubtractionMathExpressionLevel1'] =
    'getSubtractionMathExpressionLevel1'
  ComputerMathMapEnum['getMultiplicationMathExpressionLevel1'] =
    'getMultiplicationMathExpressionLevel1'
  ComputerMathMapEnum['getDivisionMathExpressionLevel1'] =
    'getDivisionMathExpressionLevel1'
  ComputerMathMapEnum['getAddendMathExpressionLevel2'] =
    'getAddendMathExpressionLevel2'
  ComputerMathMapEnum['getSubtractionMathExpressionLevel2'] =
    'getSubtractionMathExpressionLevel2'
  ComputerMathMapEnum['getMultiplicationMathExpressionLevel2'] =
    'getMultiplicationMathExpressionLevel2'
  ComputerMathMapEnum['getDivisionMathExpressionLevel2'] =
    'getDivisionMathExpressionLevel2'
})(ComputerMathMapEnum || (ComputerMathMapEnum = {}))
exports.ComputerMathMapEnum = ComputerMathMapEnum
