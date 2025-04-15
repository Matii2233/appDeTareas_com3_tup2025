import { FC, useEffect } from 'react'
import styles from './ModalEnviarTarea.module.css'
import { useSprints } from '../../../../../hooks/useSprints'
import { sprintStore } from '../../../../../store/sprintStore'

type IPropsModalEnviarTarea = {
    closeModal: () => void
    enviarTarea: () => void
}

export const ModalEnviarTarea: FC<IPropsModalEnviarTarea> = ({ closeModal, enviarTarea }) => {

    const { getSprints, sprints  } = useSprints()

    const setSprintActivo = sprintStore((state) => state.setSprintActivo)

    useEffect(() => {
        getSprints()
    }, [])

  return (
    <>
        <div className={styles.modalContainer}>
            <div className={styles.modalEnviarTarea}>
                <h3>Selecciona el sprint</h3>

                <div className={styles.sprintsContainer}>
                    {sprints.map((sprint) => <p onClick={() => setSprintActivo(sprint)}>{sprint.nombre}</p>)}
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonCancelar} onClick={closeModal}>CANCELAR</button>
                 <button className={styles.buttonSubmit} onClick={enviarTarea}>ENVIAR</button>
                </div>
            </div>
        </div>
    </>
  )
}
