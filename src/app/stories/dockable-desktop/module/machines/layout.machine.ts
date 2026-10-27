import { assign, setup } from "xstate"
import { panelOptionDefaults } from "../store"

export const layoutMachine = setup({}).createMachine({
  id: "layout",
  context: ({ input }: any) => {
    return {
      component: input?.component,
      config: {},
      dirty: {},
      value: {},
    }
  },
})
