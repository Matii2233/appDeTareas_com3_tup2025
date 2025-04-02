type Estado = "pendiente" | "En proceso" | "Completado"

export interface ITarea{
    id?:string,
    titulo:string,
    descripcion:string,
    estado?: Estado,
    fechaLimite:string
}