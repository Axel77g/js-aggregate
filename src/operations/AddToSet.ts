import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";
import { AccumulatorOperationInt } from "../core/AccumulatorOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";

export class AddToSet implements AccumulatorOperationInt {
  private field: string | number | object;
  private set: Set<any> = new Set();

  constructor(field: string | number) {
    this.field = field;
  }

  initialize(): void {
    this.set = new Set();
  }

  apply(document: CollectionDocument): void {
    let val = null;
    if (typeof this.field === "object") {
      val = {};
      for (const key in this.field) {
        // @ts-ignore
        let resolved = NestedResolver.getNestedValue(document, this.field[key]);
        NestedResolver.setNestedValue(val, key, resolved);
      }
    } else {
      // @ts-ignore
      val = NestedResolver.getNestedValue(document, this.field);
    }
    this.set.add(val);
  }

  finalize(): any {
    return Array.from(this.set);
  }
}
