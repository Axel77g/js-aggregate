import {Collection} from "./Collection";

export interface OperationInt {
    execute(collection : Collection): Promise<object []>
}