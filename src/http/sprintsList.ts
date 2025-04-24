import axios from "axios"
import { ISprintsList } from "../types/TypesSprints/ISprintsList"
import { ISprint } from "../types/TypesSprints/ISprint"

const API_URL_SPRINTS = import.meta.env.VITE_API_URL_SPRINTS

// CREAMOS LA LOGICA DE ACTUALIZAR UN SPRINT Y UNA TAREA EN UN ARCHIVO APARTE
// YA QUE ES UNA LOGICA REPETITIVA LA CUAL PODEMOS REUTILIZAR
export const putSprintsList = async (sprints: ISprint[]) => {
  try {
    const response = await axios.put<ISprintsList>(API_URL_SPRINTS, {
      sprints: sprints,
    })

    return response.data
  } catch (error) {
    console.error("Algo salio mal en putProyectList", error)
  }
}