import { CollectionDocument } from "./CollectionDocument";
import { OperationInt } from "./OperationInt";

export class Collection extends Array<CollectionDocument> {
  constructor(array: object[]) {
    super();
    for (let i = 0; i < array.length; i++)
      this.push(new CollectionDocument(array[i]));
  }

  async apply(operation: OperationInt): Promise<Collection> {
    const transformedObjects = await operation.execute(this);
    return new Collection(transformedObjects);
  }
}
