import { assign, setup } from "xstate"

export const pluginsMachine = setup({}).createMachine({
  id: "plugins",
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

    },
  },
})
