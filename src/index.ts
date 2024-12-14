import { Collection } from "./core/Collection";
import { AggregateOperation } from "./core/AggregateOperation";

export { Collection } from "./core/Collection";
export { AggregateOperation } from "./core/AggregateOperation";

export { Match } from "./operations/Match";
export { Unwind } from "./operations/Unwind";
export { Project } from "./operations/Project";
export { Sort } from "./operations/Sort";
export { Sum } from "./operations/Sum";
export { First } from "./operations/First";
export { Last } from "./operations/Last";
export { AddToSet } from "./operations/AddToSet";
export { Group } from "./operations/Group";
export { Average } from "./operations/Average";
export { ReplaceRoot } from "./operations/ReplaceRoot";

export { DateToString } from "./documentOperations/DateToString";
export { ToDate } from "./documentOperations/ToDate";
export { Multiply } from "./documentOperations/Multiply";
export { MergeObject } from "./documentOperations/MergeObject";

export async function aggregate(
  collection: Collection,
  aggregation: AggregateOperation[],
) {
  for (const aggregate of aggregation) {
    const operation = aggregate.getOperation();
    const args = aggregate.getArgs();
    const operationInstance = new operation(...args);
    collection = await collection.apply(operationInstance);
  }
  return collection;
}
