import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";
import { AccumulatorOperationInt } from "../core/AccumulatorOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";

export class First implements AccumulatorOperationInt {
  private field: string | number;
  private element: any = null;

  constructor(field: string | number) {
    this.field = field;
  }

  initialize(): void {
    this.element = null;
  }

  apply(document: CollectionDocument): void {
    if (this.element !== null) return;
    // @ts-ignore
    this.element = NestedResolver.getNestedValue(document, this.field);
  }

  finalize(): any {
    return this.element;
  }
}
