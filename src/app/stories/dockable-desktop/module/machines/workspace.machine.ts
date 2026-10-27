import { assign, setup } from "xstate"

export const workspaceMachine = setup({}).createMachine({
  id: "workspace",
  initial: "idle",
  context: ({ input }: any) => {
    return {
      config: {},
      dirty: {},
      value: {},
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
