import { assign, setup } from "xstate"

export const workspaceMachine = setup({}).createMachine({
  id: "workspace",
  initial: "idle",
  context: ({ input }: any) => {
    return {
      registry: null, // spawn panelRegister
      panels: [],
      defaultSplitRatio: 0.5,
      defaultEdgeSplitRatio: 0.2,
    }
  },
  states: {
    idle: {
      on: {
        OPEN_PANEL: ["openPanel"]
      }
    },
  },
})
