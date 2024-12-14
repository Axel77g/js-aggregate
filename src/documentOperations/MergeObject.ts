import { DocumentOperationInt } from "../core/DocumentOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";
import { NestedResolver } from "../Utils/NetsedResolver";

export class MergeObject implements DocumentOperationInt {
  private readonly fields: string[];
  private readonly ROOT = "ROOT";
  constructor(fields: string[]) {
    this.fields = fields;
  }
  async execute(document: CollectionDocument): Promise<object> {
    return this.fields
      .map((field) =>
        field == this.ROOT
          ? document
          : NestedResolver.getNestedValue(document, field),
      )
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }
}
