import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { crearTareaController, editarTareaController, eliminarTareaController, getTareaController } from "../data/tareaController"
import { ITarea } from "../types/TypesBacklog/ITarea"
import Swal from "sweetalert2"

export const useTareas = () => {
    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea} = tareaStore(useShallow((state)=>({
        tareas:state.tareas,
        setArrayTareas:state.setArrayTareas,
        agregarNuevaTarea:state.agregarNuevaTarea,
        eliminarUnaTarea:state.eliminarUnaTarea,
        editarUnaTarea:state.editarUnaTarea
    })))

    const getTareas = async() =>{
        const data = await getTareaController()
        if(data) setArrayTareas(data)
    }
    const crearTarea = async( nuevaTarea:ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await crearTareaController(nuevaTarea)
            Swal.fire("Exito","La tarea se creo correctamente","success")
        } catch (error) {
            eliminarTareaController(nuevaTarea.id!)
            console.log(error)
            
        }
    }
    const putTareaEditar = async(tareaEditada: ITarea)=> {
        const estadoPrevio = tareas.find((el)=>el.id === tareaEditada.id)

        editarUnaTarea(tareaEditada)
        try {
            await editarTareaController(tareaEditada)
            Swal.fire("Exito","Tarea actualizada correctamente","success")
        } catch (error) {
            if (estadoPrevio) editarTareaController(estadoPrevio)
                console.log(error)
        }
    }
    const deleteTarea = async(idTarea: string) => {
        const estadoPrevio = tareas.find((el)=>el.id === idTarea)
        const confirm = await Swal.fire({
            title:"¿Estas seguro?",
            text:"Esta accion no se puede deshacer",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Si, eliminar",
            cancelButtonText:"Cancelar"
        })
        if (!confirm.isConfirmed)return;
        eliminarUnaTarea(idTarea)
        try {
            await eliminarTareaController(idTarea)
            Swal.fire("Eliminado","La tarea se elimino correctamente","success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar la tarea: ",error)
        }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        deleteTarea,
        tareas
    }
}