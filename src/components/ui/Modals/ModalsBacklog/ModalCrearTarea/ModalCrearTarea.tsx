import {  FC, useEffect, useState } from "react"
import styles from "./ModalCrearTarea.module.css"
import { ITarea } from "../../../../../types/TypesBacklog/ITarea"
import { tareaStore } from "../../../../../store/tareaStore"
import { useTareas } from "../../../../../hooks/useTareas"
import ReactDOM from "react-dom"
import { ISprint } from "../../../../../types/TypesSprints/ISprint"
import { useSprints } from "../../../../../hooks/useSprints"
import { sprintStore } from "../../../../../store/sprintStore"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { validationCrearTareaSchema } from "../../../../../schemas/BacklogSchemas/crearTareaBacklogSchema"

type IModalCrearTarea = {
    handleCloseModalCrearTarea: VoidFunction
}
const initialState:ITarea = {
    titulo:"",
    descripcion:"",
    fechaLimite:""
}
export const ModalCrearTarea: FC<IModalCrearTarea> = ({handleCloseModalCrearTarea}) => {
    const setTareaActiva = tareaStore((state)=> state.setTareaActiva)

    const tareaActiva = tareaStore((state)=> state.tareaActiva)

    const setSprintActivo = sprintStore((state) => state.setSprintActivo)

    const sprintActivo = sprintStore((state) => state.sprintActivo)

    const {crearTarea, putTareaEditar} = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(initialState)
    
    console.log(formValues)

    const {putSprint} = useSprints()

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)   
    },[tareaActiva])


    const handleCloseSubmit = () => {
        handleCloseModalCrearTarea()
        setTareaActiva(null)
    }


    return ReactDOM.createPortal(
        <div className={styles.containerModalCrearTarea}>
            <div className={styles.containerPopUp}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</h3>
                </div>

                <Formik
                    initialValues={tareaActiva ?{
                        titulo: tareaActiva?.titulo || "",
                        descripcion: tareaActiva?.descripcion || "",
                        fechaLimite: tareaActiva?.fechaLimite || "",
                        estado: tareaActiva?.estado || "Pendiente"
                    }: initialState}
                    enableReinitialize={true}
                    validationSchema= {validationCrearTareaSchema}
                    onSubmit={(values)=> {
                        if (sprintActivo) {
                            if (tareaActiva) {                
                                const tareasActualizadas = sprintActivo.tareas.map(tarea =>
                                    tarea.id === tareaActiva.id ? { ...values, id: tarea.id } : tarea
                                )
                        
                                console.log("tareas actualizadas, desde el modal crear tarea: ", tareasActualizadas)
                                
                                const sprintActualizado: ISprint = {
                                    ...sprintActivo,
                                    tareas: tareasActualizadas
                                }
                                
                                putSprint(sprintActualizado)
                                setSprintActivo(sprintActualizado)
                            } else {
                                const sinDatos = { ... values, id: crypto.randomUUID(), estado: values.estado ?? "Pendiente"  }
                        
                                const sprintActualizado: ISprint = {
                                    ...sprintActivo,
                                    tareas: [...sprintActivo.tareas, sinDatos]
                                }
                        
                                putSprint(sprintActualizado)
                                setSprintActivo(sprintActualizado)
                            }
                        } else {
                            if(tareaActiva){
                                putTareaEditar({ ...values, id: tareaActiva.id })
                            } else {
                                const sinDatos = {...values,id: crypto.randomUUID(), estado: values.estado ?? "Pendiente"}
                                crearTarea(sinDatos)
                            }
                        }
                                
                        handleCloseModalCrearTarea();
                        setTareaActiva(null); 
                    }}
                >
                    {({errors , touched,isValid, dirty})=> (
                        <Form className={styles.containerForm}>
                            <div className={styles.fillAreaContainer}>
                                <Field 
                                    className={styles.fillArea}
                                    name="titulo"
                                    id="titulo"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ingrese tarea"
                                />
                                <ErrorMessage name="titulo">
                                    {msg => <small style={{color: "red"}}>{msg}</small>}
                                </ErrorMessage>
                                <Field 
                                    className={styles.fillArea}
                                    name="descripcion"
                                    id="descripcion"
                                    as= "textarea"
                                    autoComplete="off"
                                    placeholder="Ingrese descripcion"
                                    error= <small style={{color:"red"}}>{errors.descripcion && touched.descripcion ? errors.descripcion: undefined}</small>
                                />
                                <ErrorMessage name="descripcion">
                                    {msg => <small style={{color: "red"}}>{msg}</small>}
                                </ErrorMessage>
                                <label >Ingrese fecha limite</label>
                                <Field 
                                    className={styles.fillArea}
                                    name="fechaLimite"
                                    id="fechalimite"
                                    type="date"
                                    autoComplete="off"
                                    error= <small style={{color:"red"}}>{errors.fechaLimite && touched.fechaLimite ? errors.fechaLimite: undefined}</small>
                                />
                                <ErrorMessage name="fechaLimite">
                                    {msg => <small style={{color: "red"}}>{msg}</small>}
                                </ErrorMessage>
                            </div>
                            <div className={styles.containerButtons}>
                                <button disabled={!(isValid && dirty)} className={styles.buttonSubmit}  type="submit">
                                    {tareaActiva ? "Editar": "Crear"}
                                </button>
                                <button className={styles.buttonCancelar} type="button" onClick={handleCloseSubmit}>
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}
