interface IAddendResult {
    addend1: number;
    addend2: number;
    result: number;
    expression: string;
    resultExpression: string;
}
declare type AddendResult = IAddendResult;
declare type IGetAddNum = () => AddendResult;
declare const getAddNum: IGetAddNum;
export default getAddNum;
