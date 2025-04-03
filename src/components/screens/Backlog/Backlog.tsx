import { useEffect, useState } from "react"
import { ModalCrearTarea } from "../../ui/Modals/ModalsBacklog/ModalCrearTarea/ModalCrearTarea"
import styles from "./Backlog.module.css"
import { useTareas } from "../../../hooks/useTareas"
import { ITarea } from "../../../types/TypesBacklog/ITarea"
import { tareaStore } from "../../../store/tareaStore"
import { BacklogTareasCard } from "../../ui/Cards/BacklogCards/BacklogTareasCard/BacklogTareasCard"


export const Backlog = () => {
  
  const {getTareas,tareas,deleteTarea } = useTareas()

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  useEffect(()=>{
    getTareas()
  },[])
  
  const [openModalCrearTarea, setOpenModalCrearTarea] = useState(false)
  

  const handleOpenModalCrearTarea = () =>{
    setOpenModalCrearTarea(true)
  }
  const handleCloseModalCrearTarea = () =>{
    setOpenModalCrearTarea(false)
  }
  const handleEliminarTarea = (idTarea: string) =>{
    deleteTarea(idTarea)
  }
  
  const handleOpenModalEditarTarea = (tarea:ITarea) =>{
    setTareaActiva(tarea)
    setOpenModalCrearTarea(true)
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
              tareas.length > 0 ? tareas.map((el)=><BacklogTareasCard key={el.id} tarea={el} handleOpenModalEditar={handleOpenModalEditarTarea} handleEliminarTarea={handleEliminarTarea} />): <p>No hay tareas</p>
            }
          </div>
        </div>
      </div>
    {openModalCrearTarea && <ModalCrearTarea handleCloseModalCrearTarea= {handleCloseModalCrearTarea} />}
    </>
  )
}
