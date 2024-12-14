//object key string with value of any type

import { DocumentOperationInt } from "./DocumentOperationInt";

export class CollectionDocument {
  [key: string]: any;
  constructor(object: object) {
    for (let key in object) {
      // @ts-ignore
      this[key] = object[key];
    }
  }

  apply(operation: DocumentOperationInt): Promise<CollectionDocument> {
    return operation.execute(this);
  }
}
