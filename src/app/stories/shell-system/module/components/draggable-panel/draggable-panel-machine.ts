import { assign, setup } from "xstate"

import type { PlacementType } from "./types"

export type DraggablePanelMode = "push" | "overlay"

export interface DraggablePanelMachineContext {
  isExpanded: boolean
  isResizing: boolean
  mode: DraggablePanelMode
  onExpandChange?: (isExpanded: boolean) => void
  onModeChange?: (mode: DraggablePanelMode) => void
  placement: PlacementType
}

export const draggablePanelMachine = setup({
  types: {
    context: {} as DraggablePanelMachineContext,
    events: {} as { type: "SET_EXPANDED"; isExpanded: boolean } | { type: "SET_MODE"; mode: DraggablePanelMode } | { type: "START_RESIZE" } | { type: "STOP_RESIZE" },
    input: {} as Omit<DraggablePanelMachineContext, "isResizing">,
  },
  actions: {
    setExpanded: assign(({ event }: any) => ({ isExpanded: event.isExpanded })),
    setMode: assign(({ event }: any) => ({ mode: event.mode })),
    startResize: assign(() => ({ isResizing: true })),
    stopResize: assign(() => ({ isResizing: false })),
  },
}).createMachine({
  initial: "idle",
  context: ({ input }) => ({ ...input, isResizing: false }),
  states: {
    idle: {
      on: {
        SET_EXPANDED: { actions: "setExpanded" },
        SET_MODE: { actions: "setMode" },
        START_RESIZE: { actions: "startResize" },
        STOP_RESIZE: { actions: "stopResize" },
      },
    },
  },
})
