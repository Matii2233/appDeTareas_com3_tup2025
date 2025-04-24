import { useState } from "react"
import { sprintStore } from "../../../store/sprintStore"
import { TareaCard } from "../../ui/Cards/TareaCard/TareaCard"
import styles from "./Sprints.module.css"
import { ModalCrearTarea } from "../../ui/Modals/ModalsBacklog/ModalCrearTarea/ModalCrearTarea"


export const Sprints = () => {

    const [isOpenCrearTarea, setIsOpenCrearTarea] = useState(false)

    const sprintActivo = sprintStore((state) => state.sprintActivo)

    const handleOpenCrearTarea = () => {
        setIsOpenCrearTarea(true)
    }

    const handleCloseModalCrearTarea = () => {
        setIsOpenCrearTarea(false)
    }

    console.log("sprint activo desde sprints: ", sprintActivo)
    
return (
    <>
        <div className={styles.sprintsContainer}>
            <div className={styles.headerSprints}>
                <h2 className={styles.headerTitle}>{sprintActivo?.nombre}</h2>

                <div className={styles.crearTareaContainer}>
                    <button onClick={handleOpenCrearTarea}>Crear Tarea<span className="material-symbols-outlined">add</span></button>
                    <h2 style={{fontSize:"20px", color:"#27446E", fontWeight:"700"}}>Tareas del sprint</h2>
                </div>
            </div>

            <div className={styles.bodySprints}>
                <div className={styles.column}>
                    <div className={styles.topOfColumn}>
                        <h3>Pendiente</h3>
                    </div>

                    <div className={styles.columnBodyContainer}>
                        <div className={styles.columnBody}>
                            {sprintActivo?.tareas.filter((tarea) => tarea.estado === 'Pendiente').map(
                                (tarea) => <TareaCard key={tarea.id} tarea={tarea}/>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.topOfColumn}>
                        <h3>En progreso</h3>
                    </div>

                    <div className={styles.columnBodyContainer}>
                        <div className={styles.columnBody}>
                            {sprintActivo?.tareas.filter((tarea) => tarea.estado === 'En proceso').map(
                                (tarea) => <TareaCard key={tarea.id} tarea={tarea}/>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.topOfColumn}>
                        <h3>Completado</h3>
                    </div>

                    <div className={styles.columnBodyContainer}>
                        <div className={styles.columnBody}>
                            {sprintActivo?.tareas.filter((tarea) => tarea.estado === 'Completado').map(
                                (tarea) => <TareaCard key={tarea.id} tarea={tarea}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {isOpenCrearTarea && <ModalCrearTarea handleCloseModalCrearTarea={handleCloseModalCrearTarea}/>}
    </>
  )
}
