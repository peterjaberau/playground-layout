import { setup } from "xstate"
export const layoutMachine = setup({
  actions: {},
}).createMachine({
  id: "layout",
  context: ({ spawn }: any) => ({
    root: {
      defaultSideNavCollapsed: null,
      isSideNavShortcutEnabled: false,
    },
  }),
  on: {},
  states: {},
})
