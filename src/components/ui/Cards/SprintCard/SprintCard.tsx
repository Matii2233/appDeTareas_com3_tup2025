import { FC } from "react"
import styles from "./SprintCard.module.css"
import { ISprint } from "../../../../types/TypesSprints/ISprint"

type IPropsSprintCard = {
  sprint: ISprint
  handleEditar: (sprint: ISprint) => void
  handleEliminar: (idSprint: string) => void
}

export const SprintCard: FC<IPropsSprintCard> = ({ sprint, handleEditar, handleEliminar }) => {

  return (
    <>
      <div className={styles.containerMain}>
        <h2>{sprint.nombre}</h2>
        <p>{sprint.fechaInicio}</p>
        <p>{sprint.fechaCierre}</p>

        <div className={styles.containerIcons}>
            <span className="material-symbols-outlined">visibility</span>
            <span className="material-symbols-outlined" onClick={() => handleEditar(sprint)}>edit</span>
            <span className="material-symbols-outlined" style={{color:"#DE2C2C"}} onClick={() => handleEliminar(sprint.id!)}>delete</span> 
        </div>
      </div>
    </>
  )
}
