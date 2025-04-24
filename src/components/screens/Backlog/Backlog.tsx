import { useEffect, useState } from "react"
import { ModalCrearTarea } from "../../ui/Modals/ModalsBacklog/ModalCrearTarea/ModalCrearTarea"
import styles from "./Backlog.module.css"
import { useTareas } from "../../../hooks/useTareas"
import { ITarea } from "../../../types/TypesBacklog/ITarea"
import { tareaStore } from "../../../store/tareaStore"
import { BacklogTareasCard } from "../../ui/Cards/BacklogCards/BacklogTareasCard/BacklogTareasCard"
import { ModalEnviarTarea } from "../../ui/Modals/ModalsBacklog/ModalEnviarTarea/ModalEnviarTarea"
import { sprintStore } from "../../../store/sprintStore"
import { ISprint } from "../../../types/TypesSprints/ISprint"
import { useSprints } from "../../../hooks/useSprints"
import Swal from "sweetalert2"


export const Backlog = () => {
  
  const {getTareas,tareas,deleteTarea } = useTareas()

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const tareaActiva = tareaStore((state) => state.tareaActiva)

  const setSprintActivo = sprintStore((state) => state.setSprintActivo)

  const sprintActivo = sprintStore((state) => state.sprintActivo)

  const {putSprint} = useSprints()

  useEffect(()=>{
    getTareas()
  },[])
  
  const [openModalCrearTarea, setOpenModalCrearTarea] = useState(false)

  const [isOpenEnviarTarea, setIsOpenEnviarTarea] = useState(false)

  const handleOpenModalCrearTarea = () =>{
    setOpenModalCrearTarea(true)
  }
  const handleCloseModalCrearTarea = () =>{
    setOpenModalCrearTarea(false)
  }
  const handleEliminarTarea = (idTarea: string) =>{
    deleteTarea(idTarea)
    Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success")
  }
  
  const handleOpenModalEditarTarea = (tarea:ITarea) =>{
    setTareaActiva(tarea)
    setOpenModalCrearTarea(true)
  }

  const handleOpenEnviarTarea = (tareaActiva: ITarea) => {
    setIsOpenEnviarTarea(true)
    setTareaActiva(tareaActiva)
  }

  const handleCloseEnviarTarea = () => {
    setTareaActiva(null)
    setSprintActivo(null)
    setIsOpenEnviarTarea(false)
  }

  const handleEnviarTareaASPrint = async() => {
    if (tareaActiva && tareaActiva.id && sprintActivo) {
      const sprintActualizado: ISprint = {
        ...sprintActivo,
        tareas: [...sprintActivo.tareas, tareaActiva]
      }
      console.log("tareaActiva desde el backlog: ", tareaActiva)
      await putSprint(sprintActualizado)
      
    } else {
      console.log("Hay un error en la tarea que desea enviar", tareaActiva)
    }

    await deleteTarea(tareaActiva?.id!)
    await setTareaActiva(null)
    await setIsOpenEnviarTarea(false)
  }
  
  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.headerBacklog}>
          <h2>Backlog</h2>
          <div className={styles.createTaskContainer}>
            <h3>Tareas en el backlog</h3>
            <div className={styles.containerButton}>
              <button onClick={handleOpenModalCrearTarea}>Crear Tarea <span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
        </div>

        <div className={styles.backlogBody}>
          <div>
            {
              tareas.length > 0 ? tareas.map((el)=><BacklogTareasCard key={el.id} tarea={el} handleOpenModalEditar={handleOpenModalEditarTarea} handleEliminarTarea={handleEliminarTarea} handleOpenModalEnviarTarea={handleOpenEnviarTarea}/>): <p>No hay tareas</p>
            }
          </div>
        </div>
      </div>
    {openModalCrearTarea ? <ModalCrearTarea handleCloseModalCrearTarea= {handleCloseModalCrearTarea} /> : <p></p>}
    {isOpenEnviarTarea ? <ModalEnviarTarea closeModal={handleCloseEnviarTarea} enviarTarea={handleEnviarTareaASPrint}/> : <p></p>}
    </> 
  )
}
