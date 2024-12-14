import {Collection} from "./Collection";
import {CollectionDocument} from "./CollectionDocument";

export  interface AccumulatorOperationInt {
    initialize(): void
    apply(document: CollectionDocument): void
    finalize(): any
}

export const isAccumulatorOperationInt = (object : any) : object is AccumulatorOperationInt => {
    return object.initialize !== undefined && object.apply !== undefined && object.getResult !== undefined
}

