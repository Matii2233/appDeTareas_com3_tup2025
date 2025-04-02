import axios from "axios";
import { ITarea } from "../types/TypesBacklog/ITarea";
import { API_URL } from "../utils/constantes";
import { putTareaList } from "../http/tareaList";

export const getTareaController = async (): Promise < ITarea[] | undefined> => {
    try {
        const response = await axios.get<{tareas:ITarea[]}>(API_URL)
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