export const panelOptionDefaults = {
  title: "Untitled",
  icon: null,
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
}

export const panelOptionControls = {
  initialTarget: ["floating", "docked", "tabbed"],
  defaultAnchor: ["top-left", "top-right", "bottom-left", "bottom-right"],
}