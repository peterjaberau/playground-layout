import { assign, fromPromise, sendParent, setup } from "xstate"

export const documentMachine = setup({
  actors: {},
  actions: {
    openDocument: assign({
      document: ({ event }: any) => (event.type === "app.open" ? event.document : null),
      selection: null,
    }),
    closeDocument: assign({ document: null }),
  },
  guards: {
    hasDocument: ({ context }) => context.document !== null,
  },
}).createMachine({
  id: "document",
  context: {
    document: null,
  },
  initial: "closed",
  states: {
    closed: {
      on: {
        "app.open": {
          target: "open",
          actions: "openDocument",
        },
      },
    },

    open: {
      initial: "ready",
      on: {
        "app.open": {
          target: "open",
          reenter: true,
          actions: "openDocument",
        },
        "app.close": {
          target: "closed",
          actions: "closeDocument",
        },
      },
      states: {
        ready: {},
      },
    },
  },
})
