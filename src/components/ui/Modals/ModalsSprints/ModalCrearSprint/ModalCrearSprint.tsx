import {  FC, useEffect, useState } from "react"
import styles from "./ModalCrearSprint.module.css"
import { ISprint } from "../../../../../types/TypesSprints/ISprint"
import { sprintStore } from "../../../../../store/sprintStore"
import { useSprints } from "../../../../../hooks/useSprints"
import ReactDOM from "react-dom"
import { Formik,Field,Form,ErrorMessage  } from "formik"
import { validationCrearSprintSchema } from "../../../../../schemas/SprintSchemas/crearSprintSchema"

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

    console.log(formValues)

    const {postSprint, putSprint} = useSprints()

    const sprintActivo = sprintStore((state)=>state.sprintActivo)

    const setSprintActivo = sprintStore((state)=>state.setSprintActivo)

    useEffect(() => {
        if (sprintActivo) {
            setFormValues(sprintActivo)
        }
    }, [])

    const handleCancelSubmit = () => {
        handleCloseModal()
        setSprintActivo(null)
    }

    return ReactDOM.createPortal(
        <div className={styles.containerModalCrearSprint}>
          <div className={styles.containerPopUp}>
            <div>
              <h2>{sprintActivo ? "Editar Sprint": "Crear Sprint"}</h2>
            </div>
            
            <Formik
              initialValues={{
                nombre: sprintActivo?.nombre || "",
                fechaInicio: sprintActivo?.fechaInicio || "",
                fechaCierre: sprintActivo?.fechaCierre || ""
              }}
              validationSchema={validationCrearSprintSchema}
              onSubmit={(values)=>{
                if (sprintActivo) {
                  putSprint({ ...sprintActivo, ...values });
                } else {
                  const nuevoSprint = {...values,id: crypto.randomUUID(),tareas: []};
                  postSprint(nuevoSprint);
                }
                handleCloseModal();
                setSprintActivo(null);  
              }}
            >
              {({isSubmitting,isValid,dirty,errors,touched})=>(
                <Form className={styles.containerForm}>
                  <div className={styles.fillAreaContainer}>
                    <Field
                      className={styles.fillArea}
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Nombre del sprint"
                      autoComplete="off"
                      error= {<small style={{color:"red"}}>{errors.nombre && touched.nombre ? errors.nombre: undefined}</small>}
                    />
                    <ErrorMessage name="nombre" className={styles.error}>
                      {msg => <small style={{color: "red"}}>{msg}</small>}
                    </ErrorMessage>
                    <label>Ingrese fecha de inicio</label>
                    <Field
                      className={styles.fillArea}
                      type="date"
                    
                      name="fechaInicio"
                      id="fechaInicio"
                      autoComplete="off"
                      error= {<small style={{color:"red"}}>{errors.fechaInicio && touched.fechaInicio ? errors.fechaInicio: undefined}</small>}
                    />
                    <ErrorMessage name="fechaInicio" className={styles.error}>
                      {msg => <small style={{color: "red"}}>{msg}</small>}
                    </ErrorMessage>
                    <label>Ingrese fecha de cierre</label>
                    <Field
                      className={styles.fillArea}
                      type="date"
                      name="fechaCierre"
                      id="fechaCierre"
                      autoComplete="off"
                      error= {<small style={{color:"red"}}>{errors.fechaCierre && touched.fechaCierre ? errors.fechaCierre: undefined}</small>}
                    />
                    <ErrorMessage name="fechaCierre" className={styles.error}>
                      {msg => <small style={{color: "red"}}>{msg}</small>}
                    </ErrorMessage>
                  </div>
                  <div className={styles.containerButtons}>
                  <button 
                      type="submit"
                      className={styles.buttonSubmit}
                      disabled={isSubmitting || !isValid || !dirty}
                    >
                      {sprintActivo ? "Editar" : "Crear"}
                    </button>
                    
                    <button 
                      type="button"
                      className={styles.buttonCancelar}
                      onClick={handleCancelSubmit}
                      >
                        Cancelar
                    </button>
                    
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>,
        document.getElementById("modal-root")!
      );
}
