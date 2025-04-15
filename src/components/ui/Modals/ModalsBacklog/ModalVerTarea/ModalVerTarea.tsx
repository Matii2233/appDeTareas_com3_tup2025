import { FC } from "react"
import { ITarea } from "../../../../../types/TypesBacklog/ITarea"
import styles from "./ModalVerTarea.module.css"
import ReactDOM from "react-dom"
type IModalVerTarea = {
    tarea: ITarea,
    setOpenModalVerTarea: (state: boolean) => void
}
export const ModalVerTarea: FC<IModalVerTarea> = ({tarea, setOpenModalVerTarea}) => {
    return ReactDOM.createPortal(
        <div className={styles.containerModalVerTarea}>
            <div className={styles.containerPopUp}>
                <div>
                    <h1>{tarea.titulo}</h1>
                </div>
                <div className={styles.containerTitulos}>
                    <div className={styles.divisorContainerTitulos}>
                        <h3>Descripcion:</h3>
                        <p> {tarea.descripcion}</p>
                    </div>
                    <div className={styles.divisorContainerTitulos}>
                        <h3>Fecha Limite: </h3>
                        <p>{tarea.fechaLimite}</p>
                    </div>
                    <div className={styles.divisorContainerTitulos}>
                        <h3>Estado: </h3>
                        <p>{tarea.estado}</p>
                    </div>
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={() => setOpenModalVerTarea(false)}>Cerrar</button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}
