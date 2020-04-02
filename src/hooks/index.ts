import {
  getAddendMathExpressionLevel1,
  getDivisionMathExpressionLevel1,
  getMultiplicationMathExpressionLevel1,
  getSubtractionMathExpressionLevel1
} from './level1'
import {
  getAddendMathExpressionLevel2,
  getSubtractionMathExpressionLevel2,
  getMultiplicationMathExpressionLevel2,
  getDivisionMathExpressionLevel2
} from './level2'
const computerMathMap = new Map<string, () => IMathExpressionResult>()
computerMathMap.set('getAddendMathExpressionLevel1', getAddendMathExpressionLevel1)
computerMathMap.set(
  'getSubtractionMathExpressionLevel1',
  getSubtractionMathExpressionLevel1
)
computerMathMap.set(
  'getMultiplicationMathExpressionLevel1',
  getMultiplicationMathExpressionLevel1
)
computerMathMap.set('getDivisionMathExpressionLevel1', getDivisionMathExpressionLevel1)
computerMathMap.set('getAddendMathExpressionLevel2', getAddendMathExpressionLevel2)
computerMathMap.set(
  'getSubtractionMathExpressionLevel2',
  getSubtractionMathExpressionLevel2
)
computerMathMap.set(
  'getMultiplicationMathExpressionLevel2',
  getMultiplicationMathExpressionLevel2
)
computerMathMap.set('getDivisionMathExpressionLevel2', getDivisionMathExpressionLevel2)
enum ComputerMathMapEnum {
  getAddendMathExpressionLevel1 = 'getAddendMathExpressionLevel1',
  getSubtractionMathExpressionLevel1 = 'getSubtractionMathExpressionLevel1',
  getMultiplicationMathExpressionLevel1 = 'getMultiplicationMathExpressionLevel1',
  getDivisionMathExpressionLevel1 = 'getDivisionMathExpressionLevel1',
  getAddendMathExpressionLevel2 = 'getAddendMathExpressionLevel2',
  getSubtractionMathExpressionLevel2 = 'getSubtractionMathExpressionLevel2',
  getMultiplicationMathExpressionLevel2 = 'getMultiplicationMathExpressionLevel2',
  getDivisionMathExpressionLevel2 = 'getDivisionMathExpressionLevel2'
}
export interface IMathExpressionResult {
  firstNumber: number
  secondNumber: number
  result: number
  expression: string
  resultExpression: string
}
export { computerMathMap, ComputerMathMapEnum }
