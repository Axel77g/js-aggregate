import {DocumentOperationInt} from "../core/DocumentOperationInt";
import {NestedResolver} from "../Utils/NetsedResolver";

export class Multiply implements DocumentOperationInt {
    private readonly fields: string[];
    constructor(fields: string[]) {
        this.fields = fields
    }
    async execute(document: any): Promise<number> {
        // @ts-ignore
        return this.fields.map(field => NestedResolver.getNestedValue(document,field)).reduce((acc, curr) => acc * curr)
    }
}