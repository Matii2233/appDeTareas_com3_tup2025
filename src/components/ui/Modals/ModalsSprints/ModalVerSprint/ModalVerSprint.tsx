import { FC } from 'react'
import { ISprint } from '../../../../../types/TypesSprints/ISprint'
import styles from './ModalVerSprint.module.css'
import ReactDOM from 'react-dom'

type IPropsModalVerSprint = {
    sprintActivo: ISprint
    handleClose: () => void
}

export const ModalVerSprint: FC<IPropsModalVerSprint> = ({ sprintActivo, handleClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdropModal}>
        <div className={styles.modalContainer}>
          <h2>{sprintActivo.nombre}</h2>

          <div className={styles.infoContainer}>
            <p>Fecha inicio: {sprintActivo.fechaInicio}</p>
            <p>Fecha cierre: {sprintActivo.fechaCierre}</p>
          </div>

          <button onClick={handleClose}>SALIR</button>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")!
  )
}
