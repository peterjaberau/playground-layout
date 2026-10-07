import { assign, setup } from "xstate"


export const appMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    togglePanelExpensionLeft: assign(({ context, event, self }) => {
      context.config.leftPanel.isExpanded = !context.config.leftPanel.isExpanded
    }),
    togglePanelExpensionRight: assign(({ context, event, self }) => {
      context.config.rightPanel.isExpanded = !context.config.rightPanel.isExpanded
    }),
    togglePanelExpensionBottom: assign(({ context, event, self }) => {
      context.config.bottomPanel.isExpanded = !context.config.bottomPanel.isExpanded
    }),
    togglePanelPinLeft: assign(({ context, event, self }) => {
      context.config.leftPanel.isPinned = !context.config.leftPanel.isPinned
    }),
    togglePanelPinRight: assign(({ context, event, self }) => {
      context.config.rightPanel.isPinned = !context.config.rightPanel.isPinned
    }),
    togglePanelPinBottom: assign(({ context, event, self }) => {
      context.config.bottomPanel.isPinned = !context.config.bottomPanel.isPinned
    }),
  },

  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      config: input?.config,
      data: input?.data,
    }
  },

  states: {
    idle: {
      on: {
        TOGGLE_PANEL_EXPENSION_LEFT: {
          actions: ["togglePanelExpensionLeft"],
        },
        TOGGLE_PANEL_EXPENSION_RIGHT: {
          actions: ["togglePanelExpensionRight"],
        },
        TOGGLE_PANEL_EXPENSION_BOTTOM: {
          actions: ["togglePanelExpensionBottom"],
        },

        TOGGLE_PANEL_PIN_LEFT: {
          actions: ["togglePanelPinLeft"],
        },
        TOGGLE_PANEL_PIN_RIGHT: {
          actions: ["togglePanelPinRight"],
        },
        TOGGLE_PANEL_PIN_BOTTOM: {
          actions: ["togglePanelPinBottom"],
        },
      },
    },
  },
})


