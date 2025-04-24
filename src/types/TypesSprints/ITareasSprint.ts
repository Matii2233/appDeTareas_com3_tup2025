type Estado = "pendiente" | "En proceso" | "Completado"
export interface ITareasSprint{
    "id": string,
    "titulo": string,
    "descripcion": string,
    "estado": Estado,
    "fechaLimite": string
}