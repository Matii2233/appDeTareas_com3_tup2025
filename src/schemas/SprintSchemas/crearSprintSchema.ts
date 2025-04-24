import * as Yup from 'yup'

export const validationCrearSprintSchema = Yup.object(
    {
        nombre: Yup.string().min(3, "Minimo 3 caracteres").max(100, "Limite de caracteres alzanzado").required("Campo requerido"),
        fechaInicio: Yup.date().min(new Date(2024,11,31),"La fecha ingresada no puede ser anterior al 2024").max(new Date(2030,11,31),"La fecha ingresada no puede ser mayor a el año 2030").required("Campo requerido"),
        fechaCierre: Yup.date().min(new Date(),"La fecha no puede ser en el pasado").max(new Date(2030,11,31),"La fecha no puede ser mayor a 2030").required("Campo requerido")
    }
)