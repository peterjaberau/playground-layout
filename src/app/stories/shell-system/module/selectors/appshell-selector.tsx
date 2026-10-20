import { useSelector } from "@xstate/react"
import { AppShellContext } from "../providers/appshell-provider"

export function useAppShell() {
  const appShellRef = AppShellContext.useActorRef()
  const sendToAppShell = appShellRef.send

  const appShellState: any = useSelector(appShellRef, (state) => state)
  const appShellContext = appShellState.context
  const appShellConfig = appShellContext.config

  const appShellId = appShellRef?.id

  const expandLeftPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_EXPENSION_LEFT" })
  const expandRightPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_EXPENSION_RIGHT" })
  const expandBottomPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_EXPENSION_BOTTOM" })
  const setLeftPanelExpanded = (isExpanded: boolean) => sendToAppShell({ type: "SET_PANEL_EXPANSION_LEFT", isExpanded })
  const setRightPanelExpanded = (isExpanded: boolean) => sendToAppShell({ type: "SET_PANEL_EXPANSION_RIGHT", isExpanded })
  const setBottomPanelExpanded = (isExpanded: boolean) => sendToAppShell({ type: "SET_PANEL_EXPANSION_BOTTOM", isExpanded })

  const toggleLeftPanelMode = () => sendToAppShell({ type: "TOGGLE_PANEL_MODE_LEFT" })
  const toggleRightPanelMode = () => sendToAppShell({ type: "TOGGLE_PANEL_MODE_RIGHT" })
  const toggleBottomPanelMode = () => sendToAppShell({ type: "TOGGLE_PANEL_MODE_BOTTOM" })

  const isLeftPanelPush = appShellConfig.leftPanel.mode === "push"
  const isLeftPanelOverlay = appShellConfig.leftPanel.mode === "overlay"
  const isRightPanelPush = appShellConfig.rightPanel.mode === "push"
  const isRightPanelOverlay = appShellConfig.rightPanel.mode === "overlay"
  const isBottomPanelPush = appShellConfig.bottomPanel.mode === "push"
  const isBottomPanelOverlay = appShellConfig.bottomPanel.mode === "overlay"

  return {
    appShellId,
    appShellRef,
    sendToAppShell,

    appShellState,
    appShellContext,
    appShellConfig,
    expandLeftPanel,
    expandRightPanel,
    expandBottomPanel,
    setLeftPanelExpanded,
    setRightPanelExpanded,
    setBottomPanelExpanded,
    toggleLeftPanelMode,
    toggleRightPanelMode,
    toggleBottomPanelMode,
    isLeftPanelPush,
    isLeftPanelOverlay,
    isRightPanelPush,
    isRightPanelOverlay,
    isBottomPanelPush,
    isBottomPanelOverlay,
  }
}
