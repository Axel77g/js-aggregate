import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { AggregateOperation } from "../core/AggregateOperation";
import { isAccumulatorOperationInt } from "../core/AccumulatorOperationInt";
import { NestedResolver } from "../Utils/NetsedResolver";

export class Group implements OperationInt {
  private readonly groupObject: Record<string, any>;

  constructor(groupObject: object) {
    this.groupObject = groupObject;
  }
  async execute(collection: Collection): Promise<object[]> {
    const { _id, ...accumulators } = this.groupObject;
    const groupedResults: Record<string, any> = {};

    for (const doc of collection) {
      const key = this.getGroupKey(doc, _id);
      let keyString = typeof key === "object" ? JSON.stringify(key) : key;

      if (!groupedResults[keyString]) {
        groupedResults[keyString] = { _id: key };
        for (const accumulatorKey in accumulators) {
          let value = accumulators[accumulatorKey];
          // @ts-ignore
          if (value instanceof AggregateOperation) {
            let op = value.getOperation();
            let args = value.getArgs();
            let accumulatorInstance = new op(...args);
            groupedResults[keyString][accumulatorKey] = accumulatorInstance;
          }
        }
      }

      for (const accumulator in accumulators) {
        const operation = groupedResults[keyString][accumulator];
        operation.apply(doc);
      }
    }

    for (const key in groupedResults) {
      for (const accumulator in accumulators) {
        const operation = groupedResults[key][accumulator];
        groupedResults[key][accumulator] = operation.finalize();
      }
    }
    // @ts-ignore
    return Object.values(groupedResults);
  }

  private getGroupKey(doc: object, _id: any): string | object {
    if (_id === null) return _id;
    if (typeof _id === "string") {
      // @ts-ignore
      return doc[_id];
    } else {
      // @ts-ignore
      return Object.entries(_id).reduce((acc, [key, value]) => {
        acc[key] = NestedResolver.getNestedValue(doc, value);
        return acc;
      }, {});
    }
  }
}
