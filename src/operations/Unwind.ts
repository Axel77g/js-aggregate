import { OperationInt } from "../core/OperationInt";
import { Collection } from "../core/Collection";
import { NestedResolver } from "../Utils/NetsedResolver";

export class Unwind implements OperationInt {
  private readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  async execute(collection: Collection): Promise<object[]> {
    const result: object[] = [];
    for (const doc of collection) {
      // Obtenir la valeur de la propriété imbriquée
      const values = NestedResolver.getNestedValue(doc, this.field);
      if (Array.isArray(values)) {
        // Pour chaque valeur du tableau, créer un nouveau document
        for (const value of values) {
          // Créer une copie du document
          const newDoc = { ...doc };
          NestedResolver.setNestedValue(newDoc, this.field, value);
          result.push(JSON.parse(JSON.stringify(newDoc)));
        }
      } else {
        result.push(doc); // Ajouter le document original si pas un tableau
      }
    }

    return result;
  }
}
