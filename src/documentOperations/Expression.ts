import { DocumentOperationInt } from "../core/DocumentOperationInt";
import { CollectionDocument } from "../core/CollectionDocument";

type ExpressionCallback = (document: CollectionDocument) => Promise<any>;

export class Expression implements DocumentOperationInt {
  private readonly callback: ExpressionCallback;
  constructor(callback: ExpressionCallback) {
    this.callback = callback;
  }
  async execute(document: CollectionDocument): Promise<any> {
    return this.callback(document);
  }
}
