type Estado = "Pendiente" | "En proceso" | "Completado"

export interface ITarea{
    id?:string,
    titulo:string,
    descripcion:string,
    estado?: Estado,
    fechaLimite:string
}