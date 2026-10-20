import { assign, setup } from "xstate"

export const appshellMachine = setup({
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
    setPanelExpansionLeft: assign(({ context, event }: any) => {
      context.config.leftPanel.isExpanded = event.isExpanded
    }),
    setPanelExpansionRight: assign(({ context, event }: any) => {
      context.config.rightPanel.isExpanded = event.isExpanded
    }),
    setPanelExpansionBottom: assign(({ context, event }: any) => {
      context.config.bottomPanel.isExpanded = event.isExpanded
    }),
    togglePanelModeLeft: assign(({ context }) => {
      context.config.leftPanel.mode = context.config.leftPanel.mode === "push" ? "overlay" : "push"
    }),
    togglePanelModeRight: assign(({ context }) => {
      context.config.rightPanel.mode = context.config.rightPanel.mode === "push" ? "overlay" : "push"
    }),
    togglePanelModeBottom: assign(({ context }) => {
      context.config.bottomPanel.mode = context.config.bottomPanel.mode === "push" ? "overlay" : "push"
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
        SET_PANEL_EXPANSION_LEFT: {
          actions: ["setPanelExpansionLeft"],
        },
        SET_PANEL_EXPANSION_RIGHT: {
          actions: ["setPanelExpansionRight"],
        },
        SET_PANEL_EXPANSION_BOTTOM: {
          actions: ["setPanelExpansionBottom"],
        },

        TOGGLE_PANEL_MODE_LEFT: {
          actions: ["togglePanelModeLeft"],
        },
        TOGGLE_PANEL_MODE_RIGHT: {
          actions: ["togglePanelModeRight"],
        },
        TOGGLE_PANEL_MODE_BOTTOM: {
          actions: ["togglePanelModeBottom"],
        },
      },
    },
  },
})
