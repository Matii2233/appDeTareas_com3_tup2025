import axios from "axios";
import { ITarea } from "../types/TypesBacklog/ITarea";
import { putTareaList } from "../http/tareaList";
import { getSprintsController } from "./sprintController";
import { putSprintsList } from "../http/sprintsList";
import { ISprint } from "../types/TypesSprints/ISprint";
const URL_BACKLOG = import.meta.env.VITE_API_URL_BACKLOG

export const getTareaController = async (): Promise < ITarea[] | undefined> => {
    try {
        const response = await axios.get<{tareas:ITarea[]}>(URL_BACKLOG)    
        return response.data.tareas
    } catch (error) {
        console.log("Problemas en getTareaController", error);
    }
}

export const crearTareaController = async (tareaNueva: ITarea) => {
    try {
        const tareasBd = await getTareaController()
        
        if (tareasBd){
            await putTareaList([...tareasBd, tareaNueva])
        } else {
            await putTareaList([tareaNueva])
        }
    } catch (error) {
        console.log("Error en createTareaController", error);
    }
};

export const editarTareaController = async (tareaEditada: ITarea) => {
    try {
        const tareasBd = await getTareaController()

        if (tareasBd){
            const result = tareasBd.map((tareaBd)=> tareaBd.id === tareaEditada.id ? {... tareaBd, ... tareaEditada}: tareaBd)
            await putTareaList(result);
        }
        return tareaEditada
        
    } catch (error) {
        console.log("Error en tareaEditadaController", error);
    }
}

// LO CREE YO
export const editarTareaSprintController = async (sprintEditado: ISprint) => {
    try {
        const sprintsBd = await getSprintsController()

        if (sprintsBd){
            const result = sprintsBd.map((sprintBd) =>
            sprintBd.id === sprintEditado.id
                ? {... sprintBd, ... sprintEditado}
                : sprintBd
            )
            await putSprintsList(result);
        }
        return sprintEditado
        
    } catch (error) {
        console.log("Error en tareaEditadaController", error);
    }
} 

export const eliminarTareaController = async(idTareaAEliminar : string ) => {
    try {
        const tareasBd = await getTareaController();

        if(tareasBd){
            const result = tareasBd.filter((taskBd)=> taskBd.id !== idTareaAEliminar)
            await putTareaList(result)
        }
    } catch (error) {
        console.log("Error en EliminarTareaController", error);
    }
}

// LO CREE YO
export const eliminarTareaSprintController = async(idTareaAEliminar: string, idSprint: string) => {
    try {
        const sprintsBd = await getSprintsController();
        console.log("array de tareas original: ", sprintsBd)

        if(sprintsBd){
            const result = sprintsBd.map((sprint) =>
                sprint.id === idSprint
                ? { ...sprint, tareas: sprint.tareas.filter((taskBd) => taskBd.id !== idTareaAEliminar) }
                : sprint
                )
            await putSprintsList(result)
            console.log("array de sprints con la tarea eliminada: ", result)
        }
    } catch (error) {
        console.log("Error en EliminarTareaSprintController", error);
    }
}