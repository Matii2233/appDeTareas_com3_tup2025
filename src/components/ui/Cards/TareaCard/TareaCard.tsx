import { FC } from 'react'
import { ITarea } from '../../../../types/TypesBacklog/ITarea'
import styles from './TareaCard.module.css'

type ITareaCard = {
    tarea: ITarea
}

export const TareaCard: FC<ITareaCard> = ({ tarea }) => {

    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.cardInfo}>
                    <p>Tarea: {tarea.titulo}</p>
                    <p>Descripcion: {tarea.descripcion}</p>
                    <p>Fecha limite: {tarea.fechaLimite}</p>
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