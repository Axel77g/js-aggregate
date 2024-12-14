import { DocumentOperationInt } from "../core/DocumentOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";
import { NestedResolver } from "../Utils/NetsedResolver";

export class ToDate implements DocumentOperationInt {
  private readonly field: string;
  constructor(field: string) {
    this.field = field;
  }
  async execute(document: CollectionDocument): Promise<Date> {
    // @ts-ignore
    let date = new Date(NestedResolver.getNestedValue(document, this.field));
    //go to UTC + 2
    date.setHours(date.getHours() - 2);
    return date;
  }
}
