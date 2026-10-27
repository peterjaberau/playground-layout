import { assign, setup } from "xstate"

export const rootMachine = setup({}).createMachine({
  id: "root",
  context: (({ input }: any) => {
    return {
      config: {},
      dirty: {},
      value: {},
    }

  })
})
