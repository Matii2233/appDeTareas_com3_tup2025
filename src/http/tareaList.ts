import axios from "axios";
import { ITarea } from "../types/TypesBacklog/ITarea";
import { IBacklog } from "../types/TypesBacklog/IBacklog";
const URL_BACKLOG = import.meta.env.VITE_API_URL_BACKLOG

export const putTareaList = async(tareas : ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(URL_BACKLOG, {
            tareas:tareas
        });
        return response.data
    } catch (error) {
        console.log("Algo salio mal en el putTareaList",error)
        
    }
}