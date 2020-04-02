export interface IMathExpressionResult {
    firstNumber: number;
    secondNumber: number;
    result: number;
    expression: string;
    resultExpression: string;
}
declare const computerMathMap: Map<string, () => IMathExpressionResult>;
declare enum ComputerMathMapEnum {
    getAddendMathExpressionLevel1 = "getAddendMathExpressionLevel1",
    getSubtractionMathExpressionLevel1 = "getSubtractionMathExpressionLevel1",
    getMultiplicationMathExpressionLevel1 = "getMultiplicationMathExpressionLevel1",
    getDivisionMathExpressionLevel1 = "getDivisionMathExpressionLevel1",
    getAddendMathExpressionLevel2 = "getAddendMathExpressionLevel2",
    getSubtractionMathExpressionLevel2 = "getSubtractionMathExpressionLevel2",
    getMultiplicationMathExpressionLevel2 = "getMultiplicationMathExpressionLevel2",
    getDivisionMathExpressionLevel2 = "getDivisionMathExpressionLevel2"
}
export { computerMathMap, ComputerMathMapEnum };
