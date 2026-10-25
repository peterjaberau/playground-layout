import { assign, setup } from "xstate"

export const panelManagerMachine = setup({}).createMachine({
  id: "panel-manager",
  context: ({ input }: any) => {
    return {
      component: input?.component || "default",
      controls: {
        defaultAnchor: ["top-left", "top-right", "bottom-left", "bottom-right"],
        initialTarget: ["floating", "docked", "tabbed"],
      },
      defaultOptions: {
        title: input?.title || "Untitled",
        icon: input?.icon,
        initialTarget: "docked",
        favoritePosition: { x: 300, y: 150, width: 450, height: 350 },
        canClose: true,
        canMinimize: true,
        canDrag: true,
        canFloat: true,
        canDock: true,
        defaultAnchor: null,
        disableLivePreview: false,
        keepAlive: true,
      },
    }
  },
})
