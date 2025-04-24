import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { crearTareaController, editarTareaController, editarTareaSprintController, eliminarTareaController, eliminarTareaSprintController, getTareaController } from "../data/tareaController"
import { ITarea } from "../types/TypesBacklog/ITarea"
import Swal from "sweetalert2"
import { ISprint } from "../types/TypesSprints/ISprint"
import { sprintStore } from "../store/sprintStore"

export const useTareas = () => {

    const {sprints, agregarNuevoSprint, sprintActivo, setSprintActivo} = sprintStore(useShallow((state)=>({
        sprints: state.sprints,
        agregarNuevoSprint: state.agregarNuevoSprint,
        sprintActivo:state.sprintActivo,
        setSprintActivo:state.setSprintActivo
    })))

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
    const deleteTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find(el => el.id === idTarea);
        eliminarUnaTarea(idTarea);
        try {
            await eliminarTareaController(idTarea);
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
            console.log("Algo salió mal al eliminar la tarea: ", error);
        }
    };

    const deleteTareaSprint = async(idTarea: string, idSprint: string) => {
        const estadoPrevio = sprints.find((el)=>el.id === idSprint)
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
            await eliminarTareaSprintController(idTarea, idSprint)
            if (sprintActivo?.id === idSprint) {
                const tareasActualizadas = sprintActivo.tareas.filter(t => t.id !== idTarea);
                setSprintActivo({ ...sprintActivo, tareas: tareasActualizadas });
            }
            Swal.fire("Eliminado","La tarea se elimino correctamente","success")
        } catch (error) {
            if (estadoPrevio) agregarNuevoSprint(estadoPrevio)
            console.log("Algo salio mal al eliminar la tarea: ",error)
        }
    }

    const putTareaSprintEditar = async(tareaEditada: ITarea, sprintEditado: ISprint)=> {
        const estadoPrevio = sprints.find((el)=>el.id === sprintEditado.id)
        editarUnaTarea(tareaEditada)

        try {
            await editarTareaSprintController(sprintEditado)
        } catch (error) {
            if (estadoPrevio) agregarNuevoSprint(estadoPrevio)
                console.log(error)
        }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        deleteTarea,
        deleteTareaSprint,
        putTareaSprintEditar,
        tareas
    }
}