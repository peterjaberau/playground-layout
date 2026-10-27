import { assign, setup } from "xstate"
import { panelOptionDefaults } from "../store"

export const panelMachine = setup({}).createMachine({
  id: "panel",
  context: ({ input }: any) => {
    return {
      component: input?.component,
      config: {},
      dirty: {},
      value: {},
    }
  },
})
