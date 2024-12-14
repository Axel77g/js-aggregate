import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";

export class Sort implements OperationInt {
  //sorting like mongo 1 for ascending -1 for descending
  private readonly sorting: object;
  constructor(sorting: object) {
    this.sorting = sorting;
  }

  async execute(collection: Collection): Promise<object[]> {
    return collection.sort((a, b) => {
      for (let key in this.sorting) {
        if (a[key] > b[key]) {
          // @ts-ignore
          return this.sorting[key];
        }
        if (a[key] < b[key]) {
          // @ts-ignore
          return -this.sorting[key];
        }
      }
      return 0;
    });
  }
}
