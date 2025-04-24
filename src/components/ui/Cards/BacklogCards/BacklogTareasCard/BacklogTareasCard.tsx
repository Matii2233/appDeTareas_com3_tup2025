import { FC, useState } from "react"
import styles from "./BacklogTareasCard.module.css"
import { ModalVerTarea } from "../../../Modals/ModalsBacklog/ModalVerTarea/ModalVerTarea"
import { ITarea } from "../../../../../types/TypesBacklog/ITarea"


type IBacklogTareasCard = {
    tarea: ITarea,
    handleOpenModalEditar: (tarea:ITarea) => void
    handleEliminarTarea: (idTarea: string) => void
    handleOpenModalEnviarTarea: (tarea: ITarea) => void
}
export const BacklogTareasCard: FC<IBacklogTareasCard> = ({tarea,handleOpenModalEditar,handleEliminarTarea, handleOpenModalEnviarTarea}) => {
    const [openModalVerTarea, setOpenModalVerTarea] = useState(false)
    
    const handleOpenModalVerTarea = () =>{
        setOpenModalVerTarea(true)
    }
    return (
        <>
            <div className={styles.createTaskContainer}>
                <div className={styles.taskInfo}>
                    <h3>Titulo: {tarea.titulo}</h3>
                    <h3>Descripcion: {tarea.descripcion}</h3>
                </div>

                <div className={styles.taskOptions}>
                    <button onClick={() => handleOpenModalEnviarTarea(tarea)}>Enviar</button>

                    <div className= {styles.iconsContainer}>
                        <span className="material-symbols-outlined" onClick={handleOpenModalVerTarea}>visibility</span>
                        <span className="material-symbols-outlined" onClick={()=>handleOpenModalEditar(tarea)}>edit</span>
                        <span className="material-symbols-outlined" style={{color:"#DE2C2C"}} onClick={()=> handleEliminarTarea(tarea.id!)}>delete</span>
                    </div>
                </div>
            </div>
        {openModalVerTarea && <ModalVerTarea tarea= {tarea}setOpenModalVerTarea= {setOpenModalVerTarea} /> }
        </>
    )
}
