import { assign, setup } from "xstate"

export const metadataMachine = setup({}).createMachine({
  id: "metadata",
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
