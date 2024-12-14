# JS Aggregate

A lightweight JavaScript library for aggregating JSON objects directly in the browser. Inspired by MongoDB’s aggregation framework, this library allows you to perform aggregation operations like filtering, grouping, and projecting on large JSON data stored in places like IndexedDB, LocalStorage, or in-memory.

## Features
- **Flexible aggregation operations**: Includes operations like `Match`, `Unwind`, `Project`, `Sort`, `Group`, `Average`, `Sum`, `First`, `Last`, and `AddToSet` for manipulating and transforming your data.
- **Document transformations**: Perform advanced operations such as `DateToString`, `ToDate`, `Multiply`, and `MergeObject` for more powerful data transformations.
- **Optimized for front-end**: Designed to work with large JSON objects directly in the browser, ideal for use with IndexedDB, LocalStorage, or in-memory data.
- **Intuitive API**: Simple and clear API for defining aggregation pipelines and performing complex data manipulations.
- **Aggregation pipeline**: Chain operations in a pipeline for easy and efficient data processing.

> **Note:** Not all MongoDB-like features are available; only basic operations are supported.

## Installation

Install via npm:

```bash
npm install js-aggregate
```

Example
Here’s a simple example showing how to aggregate a dataset with operations like unwind, project, group, and sort:

Example of USE
```js
import { AggregateOperation, Unwind, Project, DateToString, ToDate, Multiply, Group, Average, ReplaceRoot, MergeObject, Sort, AddToSet, aggregate } from "js-aggregate";

const data = [
    { name: "Alice", date: "2024-01-01", evaluations: [{ note: 50, coefficient: 10 }, { note: 55, coefficient: 12 }] },
    { name: "Bob", date: "2024-01-01", evaluations: [{ note: 60, coefficient: 8 }, { note: 65, coefficient: 10 }] },
    { name: "Alice", date: "2024-01-02", evaluations: [{ note: 52, coefficient: 11 }, { note: 56, coefficient: 13 }] },
];

const aggregation = [
  new AggregateOperation(Unwind, "evaluations"),
  new AggregateOperation(Unwind, "evaluations.note"),
  new AggregateOperation(Project, {
    name: true,
    date: new AggregateOperation(
      DateToString,
      "%Y-%m-%d",
      new AggregateOperation(ToDate, "evaluations.date"),
    ),
    note: "evaluations.note",
    coefficient: "evaluations.coefficient",
    performance: new AggregateOperation(Multiply, [
      "evaluations.note",
      "evaluations.coefficient",
    ]),
  }),

  new AggregateOperation(Group, {
    _id: {
      name: "name",
      date: "date",
    },
    moyenneNote: new AggregateOperation(Average, "note"),
    moyenneCoefficient: new AggregateOperation(Average, "coefficient"),
    performanceMoyenne: new AggregateOperation(Average, "performance"),
  }),

  new AggregateOperation(
    ReplaceRoot,
    new AggregateOperation(MergeObject, ["ROOT", "_id"]),
  ),

  new AggregateOperation(Project, {
    name: true,
    date: true,
    moyenneNote: true,
    moyenneCoefficient: true,
    performanceMoyenne: true,
  }),

  new AggregateOperation(Sort, {
    date: 1,
    name: 1,
  }),
];


const collection = aggregate(new Collection(data),aggregation);
```


# Contributing
Feel free to open issues or submit pull requests if you'd like to contribute to the project.

# License
This project is licensed under the MIT License.