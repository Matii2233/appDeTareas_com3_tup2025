import axios from "axios"
import { ISprint } from "../types/TypesSprints/ISprint"
import { putSprintsList } from "../http/sprintsList"
const API_URL_SPRINTS = import.meta.env.VITE_API_URL_SPRINTS

export const getSprintsController = async(): Promise<ISprint[] | undefined> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(API_URL_SPRINTS)
    return response.data.sprints
  } catch (error) {
    console.log("Hubo un error en 'getSprintsController'", error)
  }
}

export const createSprintController = async (sprintNuevo: ISprint) => {
  try {
    // Obtenemos la lista de proyectos actuales
    const sprintsBd = await getSprintsController();

    if (sprintsBd) {

      await putSprintsList([...sprintsBd, sprintNuevo]);
    } else {

      await putSprintsList([sprintNuevo]);
    }

    return sprintNuevo
  } catch (error) {
    console.log("Error en createProyectoController", error);
  }
}

export const updateSprintController = async (sprintActualizado: ISprint) => {
  try {
    const sprintsBd = await getSprintsController()

    if (sprintsBd) {
      const result = sprintsBd.map((sprintBd) =>
        sprintBd.id === sprintActualizado.id
        ? { ...sprintBd, ...sprintActualizado }
        : sprintBd
      )
      await putSprintsList(result)
    } 

    return sprintActualizado

  } catch (error) {
    console.log("Hubo un error en updateSprintController", error)
  }
}

export const deleteSprintController = async(idSprintAEliminar: string) => {
  try {
    const sprintsBd = await getSprintsController()

    if (sprintsBd) {
      const result = sprintsBd.filter(
        (sprintsBd) => sprintsBd.id !== idSprintAEliminar
      )

      await putSprintsList(result)
    }
  } catch (error) {
    console.log("hubo un error en 'deleteSprintController'", error)
  }
}

