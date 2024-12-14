import {DocumentOperationInt, isDocumentOperationInt} from "../core/DocumentOperationInt";
import {AggregateOperation} from "../core/AggregateOperation";
import {CollectionDocument} from "../core/CollectionDocument";

export class DateToString implements DocumentOperationInt{
    private readonly format: string;
    private readonly date: Date | AggregateOperation;
    constructor(format: string, date: Date | AggregateOperation) {
        this.format = format
        this.date = date
    }
    async execute(document: CollectionDocument): Promise<any> {
        if(this.date instanceof AggregateOperation){
            const operation = this.date.getOperation();
            const args = this.date.getArgs();
            const operationInstance = new operation(...args);
            const date = await operationInstance.execute(document);
            return this.formatDate(date)
        }

        return this.formatDate(this.date)
    }

    formatDate(date: Date): string {

        const options: { [key: string]: string } = {
            '%Y': date.getFullYear().toString(),                // Année à 4 chiffres
            '%y': date.getFullYear().toString().slice(-2),      // Année à 2 chiffres
            // @ts-ignore
            '%m': (date.getMonth() + 1).toString().padStart(2, '0') , // Mois à 2 chiffres
            // @ts-ignore
            '%d': date.getDate().toString().padStart(2, '0'), // Jour à 2 chiffres
            // @ts-ignore
            '%h': date.getHours().toString().padStart(2,'0'),      // Heures à 2 chiffres
            // @ts-ignore
            '%s': date.getSeconds().toString().padStart(2,'0') // Secondes à 2 chiffres
        };


        // Remplacer les formats dans la chaîne
        return this.format.replace(/%[Yymdhs]/g, match => options[match]);
    }
}