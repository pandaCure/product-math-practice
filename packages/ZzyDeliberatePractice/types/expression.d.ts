export interface IMathExpressionResult {
    firstNumber: number;
    secondNumber: number;
    result: number;
    expression: string;
    resultExpression: string;
}
declare const computerMathMap: Map<string, () => IMathExpressionResult>;
declare enum ComputerMathMapEnum {
    getAddendMathExpression = "getAddendMathExpression",
    getSubtractionMathExpression = "getSubtractionMathExpression",
    getMultiplicationMathExpression = "getMultiplicationMathExpression",
    getDivisionMathExpression = "getDivisionMathExpression"
}
export { computerMathMap, ComputerMathMapEnum };
