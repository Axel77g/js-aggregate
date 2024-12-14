import { OperationInt } from "../core/OperationInt";
import { AggregateOperation } from "../core/AggregateOperation";
import { NestedResolver } from "../Utils/NetsedResolver";

export class ReplaceRoot implements OperationInt {
  private readonly newRoot: string | AggregateOperation;
  constructor(newRoot: string | AggregateOperation) {
    this.newRoot = newRoot;
  }
  // @ts-ignore
  async execute(collection: any): Promise<any[]> {
    if (typeof this.newRoot === "string") {
      return collection.map((doc: any) =>
        NestedResolver.getNestedValue(doc, this.newRoot as string),
      );
    } else if (this.newRoot instanceof AggregateOperation) {
      let aggregateOperation = this.newRoot as AggregateOperation;
      return Promise.all(
        collection.map(async (doc: any) => {
          let op = aggregateOperation.getOperation();
          let args = aggregateOperation.getArgs();
          let aggregateOperationInstance = new op(...args);
          return await aggregateOperationInstance.execute(doc);
        }),
      );
    }
  }
}
