import * as Yup from 'yup'

export const validationCrearTareaSchema = Yup.object(
    {
        titulo: Yup.string().min(3, "Minimo 3 caracteres").max(100, "Limite de caracteres alzanzado").required("Campo requerido"),
        descripcion: Yup.string().min(4, "Minimo 4 caracteres").max(100, "Limite de caracteres alzanzado").required("Campo requerido"),
        fechaLimite: Yup.date().min(new Date(),"La fecha ingresada no puede ser en el pasado").max(new Date(2030,11,31),"La fecha ingresada no puede ser mayor a el año 2030").required("Campo requerido")
    }
)