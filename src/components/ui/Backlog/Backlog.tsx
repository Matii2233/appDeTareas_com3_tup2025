import styles from "./Backlog.module.css"

export const Backlog = () => {

  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.headerBacklog}>
          <h2>Backlog</h2>

          <div className={styles.createTaskContainer}>
            <h3>Tareas en el backlog</h3>
            <button>Crear Tarea <span className="material-symbols-outlined">add</span></button>
          </div>
        </div>

        <div className={styles.backlogBody}>
          <div className={styles.taskContainer}>
            <div className={styles.taskInfo}>
              <h3>Titulo: Tarea1</h3>
              <h3>Descripcion: Descripcion de la tarea...</h3>
            </div>

            <div className={styles.taskOptions}>
              <button>Enviar</button>

              <select id="options" name="options">
                <option value="option">Selecciona un sprint</option>
                <option value="option1">Sprint 1</option>
                <option value="option2">Sprint 2</option>
                <option value="option3">Sprint 3</option>
              </select>

              <div className={styles.iconsContainer}>
                <span className="material-symbols-outlined">visibility</span>
                <span className="material-symbols-outlined">edit</span>
                <span className="material-symbols-outlined" style={{color:"#DE2C2C"}}>delete</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
