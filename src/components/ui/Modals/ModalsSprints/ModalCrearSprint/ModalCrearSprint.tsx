import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import styles from "./ModalCrearSprint.module.css"
import { ISprint } from "../../../../../types/TypesSprints/ISprint"
import { sprintStore } from "../../../../../store/sprintStore"
import { useSprints } from "../../../../../hooks/useSprints"

type IPropsModalCrearSprint = {
    handleCloseModal: VoidFunction
}

const initialState: ISprint = {
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
    tareas: []
}
export const ModalCrearSprint: FC<IPropsModalCrearSprint> = ({ handleCloseModal }) => {

    const [formValues, setFormValues] = useState<ISprint>(initialState)

    const {postSprint, putSprint} = useSprints()

    const sprintActivo = sprintStore((state)=>state.sprintActivo)

    const setSprintActivo = sprintStore((state)=>state.setSprintActivo)

    useEffect(() => {
        if (sprintActivo) {
            setFormValues(sprintActivo)
        }
    }, [])


    // METODOS DE ACCION

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        

        if (sprintActivo) {
            putSprint(formValues)
            console.log("se envio el formulario con los datos: ", formValues)
        } else {
            const sinDatos = {...formValues, id: crypto.randomUUID()}
            postSprint(sinDatos)
        }

        handleCloseModal()
        setSprintActivo(null)
    }

    const handleCancelSubmit = () => {
        handleCloseModal()
        setSprintActivo(null)
    }

  return (
    <>
    <form className={styles.modalContainer}>
        <h2>CREAR SPRINT</h2>
        <div className={styles.containerInputs}>
            <input type="text" placeholder="Nombre sprint" onChange={handleChange}
            name="nombre" value={formValues.nombre}></input>

            <input type="date" placeholder="Fecha inicio" onChange={handleChange}
            name="fechaInicio" value={formValues.fechaInicio}></input>
            
            <input type="date" placeholder="Fecha fin" onChange={handleChange}
            name="fechaCierre" value={formValues.fechaCierre}></input>
        </div>

        <div className={styles.containerButtons}>
            <button className={styles.buttonCancelar} onClick={handleCancelSubmit}>CANCELAR</button>
            <button className={styles.buttonSubmit} onClick={handleSubmit}>ENVIAR</button>
        </div>
    </form>
    </>
  )
}
