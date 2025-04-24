import styles from "./MainScreen.module.css"
import { SprintCard } from "../../ui/Cards/SprintCard/SprintCard"
import { useEffect, useState } from "react"
import { ModalCrearSprint } from "../../ui/Modals/ModalsSprints/ModalCrearSprint/ModalCrearSprint"
import { sprintStore } from "../../../store/sprintStore"
import { useSprints } from "../../../hooks/useSprints"
import { ISprint } from "../../../types/TypesSprints/ISprint"
import { Outlet, useNavigate } from "react-router-dom"


export const MainScreen = () => {
  const [isBacklog, setIsBacklog] = useState(true)

  const [isOpenModal, setIsOpenModal] = useState(false) //Estado para abrir el modal añadir o editar sprint

  const { sprints, getSprints, deleteSprint } = useSprints()

  const navigate = useNavigate()

  const setSprintActivo = sprintStore((state) => state.setSprintActivo)

  useEffect(() => {
    getSprints()
  },[])

  const handleOpenModalCrear = () => {
    setSprintActivo(null)
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

  const handleGoToSprint = (sprint: ISprint) => {
    setIsBacklog(false)
    setSprintActivo(sprint)
    navigate('/sprint')
  }

  const handleGoToBacklog = () => {
    setIsBacklog(true)
    setSprintActivo(null)
    navigate('/backlog')
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Aplicacion de tareas</h2>
        </div>

        <div className={styles.containerSidebar}>
            <button
              onClick={handleGoToBacklog}
              style={isBacklog ? { backgroundColor: "#27446E", color: "white" } : {}}
            >
              Backlog
            </button>

            <h2 className={styles.listaSprintsTitle}>Lista Sprints</h2>

            {sprints.length > 0
              ? sprints.map((sprint) =>
                <SprintCard key={sprint.id} sprint={sprint} handleEditar={handleOpenModalEditar} handleEliminar={handleEliminarSprint} handleGoToSprint={handleGoToSprint} />
              )
              : <p>No hay sprints creados</p>
            }

            <div className={styles.addSprint}>
              <span className="material-symbols-outlined"
                onClick={handleOpenModalCrear}>add</span>
            </div>
          </div>
      </div>

      {isOpenModal ? <ModalCrearSprint handleCloseModal={handleCloseModalCrear} /> : null}

      <Outlet/>
    </>
  )
}
