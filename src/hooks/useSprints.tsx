import { useShallow } from "zustand/shallow"
import { createSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintController"
import { sprintStore } from "../store/sprintStore"
import { ISprint } from "../types/TypesSprints/ISprint"
import Swal from "sweetalert2"
import { eliminarTareaController } from "../data/tareaController"


export const useSprints = () => {

  // TRAEMOS TODOS LOS METODOS DE LA STORE DE NUESTROS SPRINTS
  // (A EXEPCION DEL SPRINTACTIVO Y EL SETSPRINTACTIVO)
  const {
    sprints,
    agregarArregloSprints,
    agregarNuevoSprint,
    editarSprint,
    eliminarSprint
  } = sprintStore(useShallow((state)=>({
    sprints: state.sprints,
    agregarArregloSprints: state.agregarArregloSprints,
    agregarNuevoSprint: state.agregarNuevoSprint,
    editarSprint: state.editarSprint,
    eliminarSprint: state.eliminarSprint
  })))

  const getSprints = async () => {
    const data = await getSprintsController()
    if (data) {
      agregarArregloSprints(data)
    }
  }

  const postSprint = async (sprint: ISprint) => {
    agregarNuevoSprint(sprint)

    try {
      await createSprintController(sprint)
      Swal.fire("Exito","El Sprint se creo correctamente","success")
    } catch (error) {
      await eliminarTareaController(sprint.id!)
      console.log(error)
    }
  }

  const putSprint = async (sprintEditado: ISprint) => {
    const estadoPrevio = sprints.find((sprint) => sprint.id === sprintEditado.id)

    editarSprint(sprintEditado)

    try {
      await updateSprintController(sprintEditado)
      Swal.fire("Exito", "El Sprint se editó con éxito", "success")

    } catch (error) {
      if (estadoPrevio) {
        await updateSprintController(estadoPrevio)
        console.log(error)
      }
    }
  }

  const deleteSprint = async (idSprint: string) => {
    const estadoPrevio = sprints.find((sprint) => sprint.id === idSprint)

    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar"
    })

    if (!confirm.isConfirmed)return

    eliminarSprint(idSprint)

    try {
      await deleteSprintController(idSprint)
      Swal.fire("Eliminado","El sprint se elimino correctamente","success")
    } catch (error) {
      if (estadoPrevio) {
        agregarNuevoSprint(estadoPrevio)
        console.log(error)
      }
    }
  }

  return {
    getSprints,
    postSprint,
    putSprint,
    deleteSprint,
    sprints
  }
}
