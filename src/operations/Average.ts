import {OperationInt} from "../core/OperationInt";
import {Collection} from "../core/Collection";
import {NestedResolver} from "../Utils/NetsedResolver";
import {AccumulatorOperationInt} from "../core/AccumulatorOperationInt";
import {CollectionDocument} from "../core/CollectionDocument";

export class Average implements AccumulatorOperationInt
{
    private field: string
    private sum: number = 0
    private count: number = 0

    constructor(field: string) {
        this.field = field
    }

    initialize(): void {
        this.sum = 0
        this.count
    }

    apply(document: CollectionDocument): void {
        // @ts-ignore
        this.sum += NestedResolver.getNestedValue(document, this.field)
        this.count += 1
    }

    finalize(): any {
        return this.sum / this.count
    }
}