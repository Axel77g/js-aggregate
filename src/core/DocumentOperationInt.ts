import {CollectionDocument} from "./CollectionDocument";

export interface DocumentOperationInt {
    execute(document : CollectionDocument): Promise<any>
}

export const isDocumentOperationInt = (object : any) : object is DocumentOperationInt => {
    return object.execute !== undefined
}