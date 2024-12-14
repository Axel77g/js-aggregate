import {DocumentOperationInt} from "./DocumentOperationInt";
import {OperationInt} from "./OperationInt";

export class AggregateOperation{
    private readonly operation: any
    private readonly args: any[]
    constructor(operation: any, ...args: any[]) {
        this.operation = operation
        this.args = args
    }
    getOperation(){
        return this.operation
    }
    getArgs(){
        return this.args
    }
}
