import { assign, setup } from "xstate"

export const workspaceMachine = setup({}).createMachine({
  id: "panel-registry",
  context: ({ input }: any) => {
    return {
      registry: {},
    }
  },
})
