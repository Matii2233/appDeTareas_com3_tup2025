import styles from './TareaCard.module.css'

export const TareaCard = () => {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.cardInfo}>
                    <p>Tarea: </p>
                    <p>Descripcion: </p>
                    <p>Fecha limite: </p>
                </div>

                <div className={styles.enviarCard}>
                    <button>Enviar</button>
                    <button style={{width:"50%", paddingLeft:"5%"}}>Iniciado<span className='material-symbols-outlined'>keyboard_double_arrow_right</span></button>
                </div>

                <div className={styles.cardActionIcons}>
                    <span className="material-symbols-outlined">visibility</span>
                    <span className="material-symbols-outlined">edit</span>
                    <span className="material-symbols-outlined" style={{color:"#DE2C2C", borderColor:"#DE2C2C"}}>delete</span> 
                </div>
            </div>
        </>
    )
}