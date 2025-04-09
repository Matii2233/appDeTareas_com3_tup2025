import styles from "./MainScreen.module.css"
import { Backlog } from '../Backlog/Backlog'
import { SprintCard } from "../../ui/Cards/SprintCard/SprintCard"
import { useState } from "react"
import { Sprints } from "../Sprints/Sprints"


export const MainScreen = () => {
  const [isBacklog, setIsBacklog] = useState(true)

  return (
    <>
      <div className={styles.mainContainer}>
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

            <SprintCard/>
        </div>

        <div className={styles.containerContent}>
            {isBacklog ? <Backlog/> : <Sprints/>}
        </div>
      </div>
    </>
  )
}
