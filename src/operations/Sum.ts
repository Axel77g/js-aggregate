import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";
import { AccumulatorOperationInt } from "../core/AccumulatorOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";

export class Sum implements AccumulatorOperationInt {
  private field: string | number;
  private sum: number = 0;

  constructor(field: string | number) {
    this.field = field;
  }

  initialize(): void {
    this.sum = 0;
  }

  apply(document: CollectionDocument): void {
    if (typeof this.field === "number") {
      this.sum += this.field;
      return;
    }
    // @ts-ignore
    this.sum += NestedResolver.getNestedValue(document, this.field);
  }

  finalize(): any {
    return this.sum;
  }
}
