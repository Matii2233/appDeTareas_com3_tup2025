import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import styles from "./ModalCrearTarea.module.css"
import { ITarea } from "../../../../../types/TypesBacklog/ITarea"
import { tareaStore } from "../../../../../store/tareaStore"
import { useTareas } from "../../../../../hooks/useTareas"

type IModalCrearTarea = {
    handleCloseModalCrearTarea: VoidFunction
}
const initialState:ITarea = {
    titulo:"",
    descripcion:"",
    fechaLimite:""
}
export const ModalCrearTarea: FC<IModalCrearTarea> = ({handleCloseModalCrearTarea}) => {
    const tareaActiva = tareaStore((state)=>state.tareaActiva)

    const setTareaActiva = tareaStore((state)=> state.setTareaActiva)

    const {crearTarea, putTareaEditar} = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)   
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name , value} = e.target
        setFormValues((prev)=> ({...prev,[`${name}`]: value}))
    }

    const handleSubmit = (e:FormEvent)=> {
        e.preventDefault()
        if(tareaActiva){
            putTareaEditar(formValues)
        } else{
            const sinDatos = {...formValues,id: crypto.randomUUID(), estado: formValues.estado ?? "pendiente"}
            crearTarea(sinDatos)

        }
        handleCloseModalCrearTarea();
        setTareaActiva(null);
        
    }
    const handleCloseSubmit = () => {
        handleCloseModalCrearTarea()
        setTareaActiva(null)
    }
    return (
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
        </div>
    )
}
