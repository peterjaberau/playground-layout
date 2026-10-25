import { assign, setup } from "xstate"

export const layoutMachine = setup({}).createMachine({
  id: "layout",
  initial: "idle",
  context: ({ input }: any) => {
    return {
      gridRoot: [],
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
