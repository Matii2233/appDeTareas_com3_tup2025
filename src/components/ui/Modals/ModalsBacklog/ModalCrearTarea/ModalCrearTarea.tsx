import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import styles from "./ModalCrearTarea.module.css"
import { ITarea } from "../../../../../types/TypesBacklog/ITarea"
import { tareaStore } from "../../../../../store/tareaStore"
import { useTareas } from "../../../../../hooks/useTareas"
import ReactDOM from "react-dom"
import { ISprint } from "../../../../../types/TypesSprints/ISprint"
import { useSprints } from "../../../../../hooks/useSprints"
import { sprintStore } from "../../../../../store/sprintStore"

type IModalCrearTarea = {
    handleCloseModalCrearTarea: VoidFunction
    tareaActiva?: ITarea
}
const initialState:ITarea = {
    titulo:"",
    descripcion:"",
    fechaLimite:""
}
export const ModalCrearTarea: FC<IModalCrearTarea> = ({handleCloseModalCrearTarea, tareaActiva}) => {
    const setTareaActiva = tareaStore((state)=> state.setTareaActiva)

    const setSprintActivo = sprintStore((state) => state.setSprintActivo)

    const sprintActivo = sprintStore((state) => state.sprintActivo)

    const {crearTarea, putTareaEditar} = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    const {putSprint} = useSprints()

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)   
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name , value} = e.target
        setFormValues((prev)=> ({...prev,[`${name}`]: value}))
    }

    const handleSubmit = (e:FormEvent)=> {
        e.preventDefault()

        if (sprintActivo) {
            if (tareaActiva) {                
                const tareasActualizadas = sprintActivo.tareas.map(tarea =>
                    tarea.id === tareaActiva.id ? { ...formValues, id: tarea.id } : tareaActiva
                )

                console.log("tareas actualizadas, desde el modal crear tarea: ", tareasActualizadas)
        
                const sprintActualizado: ISprint = {
                    ...sprintActivo,
                    tareas: tareasActualizadas
                }
        
                putSprint(sprintActualizado)
                setSprintActivo(sprintActualizado)
            } else {
                const sinDatos = { ...formValues, id: crypto.randomUUID(), estado: formValues.estado ?? "Pendiente" }

                const sprintActualizado: ISprint = {
                    ...sprintActivo,
                    tareas: [...sprintActivo.tareas, sinDatos]
                }

                putSprint(sprintActualizado)
                setSprintActivo(sprintActualizado)
            }
        } else {
            if(tareaActiva){
                putTareaEditar(formValues)
            } else {
                const sinDatos = {...formValues,id: crypto.randomUUID(), estado: formValues.estado ?? "Pendiente"}
                crearTarea(sinDatos)
            }
        }
        
        handleCloseModalCrearTarea();
        setTareaActiva(null); 
    }

    const handleCloseSubmit = () => {
        handleCloseModalCrearTarea()
        setTareaActiva(null)
    }

    console.log("tarea activa desde el mdoal crear tarea: ", tareaActiva)
    console.log("sprint activo desde el mdoal crear tarea: ", sprintActivo)

    return ReactDOM.createPortal(
        <div className={styles.containerModalCrearTarea}>
            <div className={styles.containerPopUp}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</h3>
                </div>

                <form  onSubmit={handleSubmit}className={styles.containerForm}>
                    <div className={styles.fillAreaContainer}>
                        <input className={styles.fillArea} onChange={handleChange} value={formValues.titulo}
                        type="text" required autoComplete="off" name="titulo" placeholder="Ingrese tarea"/>
                        <textarea className={styles.fillArea} onChange={handleChange} value={formValues.descripcion}
                        required autoComplete="off" name="descripcion" placeholder="Ingrese descripción" />
                        <input className={styles.fillArea} style={{width:"30%"}} onChange={handleChange} value={formValues.fechaLimite}
                        type="date" required autoComplete="off" name="fechaLimite" />
                    </div>
                    <div className={styles.containerButtons}>
                        <button className={styles.buttonSubmit} type="submit">{tareaActiva ? "Editar tarea": "Crear Tarea"}</button>
                        <button className={styles.buttonCancelar} onClick={handleCloseSubmit} >Cancelar</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}
