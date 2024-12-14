import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { AggregateOperation } from "../core/AggregateOperation";
import { CollectionDocument } from "../core/CollectionDocument";
import { NestedResolver } from "../Utils/NetsedResolver";

export class Project implements OperationInt {
  private readonly projection: Record<string, any>;
  constructor(object: object) {
    this.projection = object;
  }
  async execute(collection: Collection): Promise<object[]> {
    const result: object[] = [];

    for (const doc of collection) {
      let newDoc: CollectionDocument = new CollectionDocument({});

      for (const key in this.projection) {
        const value = this.projection[key];

        if (typeof value === "boolean") {
          if (value) {
            newDoc[key] = doc[key];
          }
        } else if (value instanceof AggregateOperation) {
          const operation = value.getOperation();
          const args = value.getArgs();
          const operationInstance = new operation(...args);
          const newField = await operationInstance.execute(doc);
          newDoc[key] = newField;
        } else if (typeof value === "object" && !Array.isArray(value)) {
          newDoc[key] = this.projectNested(doc[key], value);
        } else {
          newDoc[key] = NestedResolver.getNestedValue(doc, value);
        }
      }

      result.push(newDoc);
    }

    return result;
  }

  private projectNested(
    doc: object,
    nestedProjection: Record<string, any>,
  ): object {
    const newNestedDoc: Record<string, any> = {};
    for (const key in nestedProjection) {
      const value = nestedProjection[key];
      if (typeof value === "boolean" && value) {
        // @ts-ignore
        newNestedDoc[key] = doc[key];
      } else if (typeof value === "object" && !Array.isArray(value)) {
        // @ts-ignore
        newNestedDoc[key] = this.projectNested(doc[key], value);
      }
    }
    return newNestedDoc;
  }
}
