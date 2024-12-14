import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";

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
        const values = NestedResolver.getNestedValue(doc, key);
        // @ts-ignore
        if (values !== this.query[key]) {
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
