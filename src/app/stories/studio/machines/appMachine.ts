import { assign, sendTo, setup, type ActorRefFrom } from "xstate"
import { filesMachine } from "./filesMachine"
import { documentMachine } from "./documentMachine"

function documentFromEvent(event: any, context: any) {
  switch (event.type) {
    case "files.created":
    case "document.opened":
      return event.document
    case "user.openDocument":
      return context.filesRef.getSnapshot().context.documents.find((d: any) => d.id === event.id) ?? null
    default:
      return null
  }
}

export const appMachine = setup({
  actors: {
    files: filesMachine,
    document: documentMachine,
  },
  actions: {
    openRequested: assign({ openId: ({ context }) => context.requestedId, requestedId: null }),
    setOpenId: assign({
      openId: ({ context, event }) => documentFromEvent(event, context)?.id ?? context.openId,
    }),
    clearOpenId: assign({ openId: null }),
    showDocument: sendTo(
      ({ context }) => context.documentRef,
      ({ context, event }) => ({
        type: "app.open" as const,
        document: documentFromEvent(event, context),
      }),
    ),
    showRequestedDocument: sendTo(
      ({ context }) => context.documentRef,
      ({ context, event }: any) => {
        if (event.type !== "files.loaded") throw new Error("wrong event")
        const document = event.documents.find((d: any) => d.id === context.requestedId)
        return { type: "app.open" as const, document }
      },
    ),
  },
  guards: {
    hasRequested: ({ context, event }) =>
      event.type === "files.loaded" && context.requestedId !== null && event.documents.some((d: any) => d.id === context.requestedId),
  },
}).createMachine({
  id: "app",
  context: ({ spawn }) => ({
    filesRef: spawn("files", { id: "files" }),
    documentRef: spawn("document", { id: "document" }),
  }),
  type: "parallel",
  on: {
    "files.loaded": [
      {
        guard: "hasRequested",
        actions: ["showRequestedDocument", "openRequested"],
      },
    ],
    "document.opened": {
      actions: ["setOpenId"],
    },
  },
})
