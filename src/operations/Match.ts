import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";
import { isDocumentOperationInt } from "../core/DocumentOperationInt";
import { AggregateOperation } from "../core/AggregateOperation";

export class Match implements OperationInt {
  private query: object;

  constructor(query: object) {
    this.query = query;
  }
  async execute(collection: Collection): Promise<object[]> {
    const result: object[] = [];
    for (const doc of collection) {
      let match = true;
      for (const key in this.query) {
        // @ts-ignore
        let targetValue = this.query[key];

        if (targetValue instanceof AggregateOperation) {
          const operation = targetValue.getOperation();
          const args = targetValue.getArgs();
          const operationInstance = new operation(...args);
          if (isDocumentOperationInt(operationInstance)) {
            targetValue = await operationInstance.execute(doc);
          } else throw new Error("Operation is not a DocumentOperation");
        }

        const values = NestedResolver.getNestedValue(doc, key);

        if (targetValue === true) {
          if (!values) {
            match = false;
            break;
          }
          continue;
        }
        if (values !== targetValue) {
          match = false;
          break;
        }
      }
      if (match) {
        result.push(doc);
      }
    }
    return result;
  }
}
