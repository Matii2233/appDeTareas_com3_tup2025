import axios from "axios";
import { ITarea } from "../types/TypesBacklog/ITarea";
import { IBacklog } from "../types/TypesBacklog/IBacklog";
import { API_URL } from "../utils/constantes";

export const putTareaList = async(tareas : ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(API_URL, {
            tareas:tareas
        });
        return response.data
    } catch (error) {
        console.log("Algo salio mal en el putTareaList",error)
        
    }
}