import { create } from "zustand";
import { ISprint } from "../types/TypesSprints/ISprint";

interface ISprintStore {
    sprints: ISprint[],
    sprintActivo: ISprint | null,
    setSprintActivo: (sprintActivo: ISprint | null) => void
    agregarNuevoSprint: (sprint: ISprint) => void,
    agregarArregloSprints: (sprints: ISprint[]) => void,
    editarSprint: (sprintActualizado: ISprint) => void,
    eliminarSprint: (idSprint: String) => void
}

export const sprintStore = create<ISprintStore>((set) => ({
  sprints: [],
  sprintActivo: null,
  setSprintActivo: (sprintActivoIn) => set(() => ({ sprintActivo: sprintActivoIn })),
  agregarNuevoSprint: (nuevoSprint) => set((state) => ({ sprints: [...state.sprints, nuevoSprint] })),
  editarSprint: (sprintEditado) =>
    set((state) => {
      const arregloSprints = state.sprints.map((sprint) =>
        sprint.id === sprintEditado.id ? { ...sprint, ...sprintEditado } : sprint
      );
      return { sprints: arregloSprints };
    }),
  eliminarSprint: (idSprint) =>
    set((state) => {
      const arregloSprints = state.sprints.filter((sprint) => sprint.id !== idSprint);
      return { sprints: arregloSprints };
    }),
  agregarArregloSprints: (arrayDeSprints) => set(() => ({ sprints: arrayDeSprints })),
}))