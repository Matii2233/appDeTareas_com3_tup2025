import { FC, useState } from 'react'
import { ITarea } from '../../../../types/TypesBacklog/ITarea'
import styles from './TareaCard.module.css'
import { ModalVerTarea } from '../../Modals/ModalsBacklog/ModalVerTarea/ModalVerTarea'
import { ModalCrearTarea } from '../../Modals/ModalsBacklog/ModalCrearTarea/ModalCrearTarea'
import { useTareas } from '../../../../hooks/useTareas'
import { sprintStore } from '../../../../store/sprintStore'
import { ISprint } from '../../../../types/TypesSprints/ISprint'
import { tareaStore } from '../../../../store/tareaStore'
import { updateSprintController } from '../../../../data/sprintController'

type ITareaCard = {
    tarea: ITarea
}

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {

    const [isOpenVerTarea, setIsOpenVerTarea] = useState(false)

    const [isOpenEditTarea, setIsOpenEditTarea] = useState(false)

    const { deleteTareaSprint, putTareaSprintEditar, crearTarea } = useTareas()

    const setSprintActivo = sprintStore((state) => state.setSprintActivo)

    const sprintActivo = sprintStore((state) => state.sprintActivo)

    const tareas = tareaStore((state) => state.tareas)

    const setTareaActiva = tareaStore((state)=> state.setTareaActiva)

    const handleOpenVerTarea = () => {
        setIsOpenVerTarea(true)
    }

    const handleOpenEditTarea = () => {
        setTareaActiva(tarea)
        setIsOpenEditTarea(true)
    }

    const handleCloseEditTarea = () => {
        setIsOpenEditTarea(false)
    }

    const handleDeleteTarea = () => {
        if (sprintActivo) {
            deleteTareaSprint(tarea.id!, sprintActivo.id!)
        } else {
            console.log("Algo no salio bien al eliminar la tarea del sprint en handleDeleteTarea")
        }
    }

    const handleEnviarTareaAlBacklog = async() => {
        const tareaExiste = tareas.some(t => t.id === tarea.id)
        tarea.estado = "Pendiente"
        if (tareaExiste) {
            if (sprintActivo) {
                await deleteTareaSprint(tarea.id!, sprintActivo.id!);
            } else {
                console.log("Algo no salio bien al eliminar la tarea del sprint en 'handleEnviarTareaAlBacklog'")
            }

        } else {
            crearTarea(tarea);
            if (sprintActivo) {
                await deleteTareaSprint(tarea.id!, sprintActivo.id!);
            } else {
                console.log("Algo no salio bien al eliminar la tarea del sprint en 'handleEnviarTareaAlBacklog'")
            }
        }

        const tareasActualizadas = sprintActivo?.tareas.filter(t => t.id !== tarea.id)
        const sprintEditado = { ...sprintActivo, tareas: tareasActualizadas }
        
        
        await setSprintActivo(sprintEditado as ISprint)
        await updateSprintController(sprintEditado as ISprint)
    }

    const handleUpdateEstadoTarea = () => {

        if (tarea.estado === "Pendiente") {
            const tareaEditada: ITarea = { ...tarea, estado: 'En proceso' }
            const tareasActualizadas = sprintActivo?.tareas.map((el) =>
                el.id === tarea.id ? tareaEditada : el
            )
            const sprintEditado = { ...sprintActivo, tareas: tareasActualizadas }
            putTareaSprintEditar(tareaEditada, sprintEditado as ISprint)
            setSprintActivo(sprintEditado as ISprint)
        }
        
        if (tarea.estado === "En proceso") {
            const tareaEditada: ITarea = { ...tarea, estado: 'Completado' }
            const tareasActualizadas = sprintActivo?.tareas.map((el) =>
                el.id === tarea.id ? tareaEditada : el
            )
            const sprintEditado = { ...sprintActivo, tareas: tareasActualizadas }
            putTareaSprintEditar(tareaEditada, sprintEditado as ISprint)
            setSprintActivo(sprintEditado as ISprint)
        }

        if (tarea.estado === "Completado") {
            const tareaEditada: ITarea = { ...tarea, estado: 'Pendiente' }
            const tareasActualizadas = sprintActivo?.tareas.map((el) =>
                el.id === tarea.id ? tareaEditada : el
            )
            const sprintEditado = { ...sprintActivo, tareas: tareasActualizadas }
            putTareaSprintEditar(tareaEditada, sprintEditado as ISprint)
            setSprintActivo(sprintEditado as ISprint)
        }
    }

    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.cardInfo}>
                    <p>Tarea: {tarea.titulo}</p>
                    <p>Descripcion: {tarea.descripcion}</p>
                    <p>Fecha limite: {tarea.fechaLimite}</p>
                </div>

                <div className={styles.enviarCard}>
                    <button onClick={handleEnviarTareaAlBacklog}>Enviar</button>
                    <button style={{width:"50%", paddingLeft:"5%"}} onClick={handleUpdateEstadoTarea}>Iniciado<span className='material-symbols-outlined'>keyboard_double_arrow_right</span></button>
                </div>

                <div className={styles.cardActionIcons}>
                    <span className="material-symbols-outlined" onClick={handleOpenVerTarea}>visibility</span>
                    <span className="material-symbols-outlined" onClick={handleOpenEditTarea}>edit</span>
                    <span className="material-symbols-outlined" style={{color:"#DE2C2C", borderColor:"#DE2C2C"}} onClick={handleDeleteTarea}>delete</span> 
                </div>
            </div>

            {isOpenVerTarea && <ModalVerTarea tarea={tarea} setOpenModalVerTarea={setIsOpenVerTarea}/>}
            {isOpenEditTarea && <ModalCrearTarea handleCloseModalCrearTarea={handleCloseEditTarea}/>}
        </>
    )
}