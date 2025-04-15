import { FC, useState } from "react"
import styles from "./SprintCard.module.css"
import { ISprint } from "../../../../types/TypesSprints/ISprint"
import { ModalVerSprint } from "../../Modals/ModalsSprints/ModalVerSprint/ModalVerSprint"

type IPropsSprintCard = {
  sprint: ISprint
  handleEditar: (sprint: ISprint) => void
  handleEliminar: (idSprint: string) => void
  handleGoToSprint: (sprint: ISprint) => void
}

export const SprintCard: FC<IPropsSprintCard> = ({ sprint, handleEditar, handleEliminar, handleGoToSprint }) => {

  const [isModalVerSprint, setIsModalVerSprint] = useState(false)

  const handleOpenVerSprint = () => {
    setIsModalVerSprint(true)
  }

  const handleCloseVerSprint = () => {
    setIsModalVerSprint(false)
  }

  return (
    <>
      <div className={styles.containerMain} onClick={() => handleGoToSprint(sprint)}>
        <h2>{sprint.nombre}</h2>
        <p>{sprint.fechaInicio}</p>
        <p>{sprint.fechaCierre}</p>

        <div className={styles.containerIcons}>
            <span className="material-symbols-outlined" onClick={handleOpenVerSprint}>visibility</span>
            <span className="material-symbols-outlined" onClick={() => handleEditar(sprint)}>edit</span>
            <span className="material-symbols-outlined" style={{color:"#DE2C2C"}} onClick={() => handleEliminar(sprint.id!)}>delete</span> 
        </div>
      </div>

      {isModalVerSprint && <ModalVerSprint sprintActivo={sprint} handleClose={handleCloseVerSprint}/>}
    </>
  )
}
