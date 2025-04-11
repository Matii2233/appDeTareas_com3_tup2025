import styles from "./MainScreen.module.css"
import { SprintCard } from "../../ui/Cards/SprintCard/SprintCard"
import { useEffect, useState } from "react"
import { ModalCrearSprint } from "../../ui/Modals/ModalsSprints/ModalCrearSprint/ModalCrearSprint"
import { sprintStore } from "../../../store/sprintStore"
import { useSprints } from "../../../hooks/useSprints"
import { ISprint } from "../../../types/TypesSprints/ISprint"
import { Sprints } from "../Sprints/Sprints"


export const MainScreen = () => {
  const [isBacklog, setIsBacklog] = useState(true)

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { sprints, getSprints, deleteSprint } = useSprints()

  const setSprintActivo = sprintStore((state) => state.setSprintActivo)

  useEffect(() => {
    getSprints()
  },[])

  const handleOpenModalCrear = () => {
    setIsOpenModal(true)
  }

  const handleCloseModalCrear = () => {
    setIsOpenModal(false)
  }

  const handleOpenModalEditar = (sprint: ISprint) => {
    setSprintActivo(sprint)
    setIsOpenModal(true)
  }

  const handleEliminarSprint = (idSprint: string) => {
    deleteSprint(idSprint)
  }
  return (
    <>
      <div className={isOpenModal ? styles.mainContainerBlur : styles.mainContainer}>
        <div className={styles.containerSidebar}>
            <button
            onClick={() => setIsBacklog(true)}
            style={isBacklog ? {backgroundColor:"#27446E", color:"white"} : {}}
            >
              Backlog
            </button>

            <button
            onClick={() => setIsBacklog(false)}
            style={isBacklog ? {} : {backgroundColor:"#27446E", color:"white"}}
            >
              Lista Sprints
            </button>

            {sprints.length > 0
              ? sprints.map((sprint) => <SprintCard key={sprint.id} sprint={sprint} handleEditar={handleOpenModalEditar} handleEliminar={handleEliminarSprint}/>)
              : <p>No hay sprints creados</p>
            }

            <div className={styles.addSprint}>
              <span className="material-symbols-outlined"
              onClick={handleOpenModalCrear}>add</span>
            </div>
        </div>

        <div className={styles.containerContent}>
          <Sprints/>
        </div>
      </div>

      {isOpenModal ? <ModalCrearSprint handleCloseModal={handleCloseModalCrear} /> : null}
    </>
  )
}
