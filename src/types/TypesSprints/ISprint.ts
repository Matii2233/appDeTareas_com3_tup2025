import { ITareasSprint } from "./ITareasSprint";

export interface ISprint {
    "id": string,
    "fechaInicio" : string,
    "fechaCierre" : string,
    "nombre": string,
    "tareas": ITareasSprint[]
}