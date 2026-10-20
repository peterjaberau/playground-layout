"use client"
import React from "react"
import { createActorContext, useSelector } from "@xstate/react"
import { appshellMachine } from "../machines"

const defaultConfig = {
  header: {},
  leftSidebar: {},
  leftPanel: {
    isExpanded: true,
    isPinned: true,
  },
  rightPanel: {
    isExpanded: true,
    isPinned: true,
  },
  rightSidebar: {},
  bottomPanel: {
    isExpanded: true,
    isPinned: true,
  },
  statusBar: {},
}


export const AppShellContext = createActorContext(appshellMachine)

export const AppShellProvider = (props: any) => {
  const { children, data = null, config, ...rest } = props
  return (
    <AppShellContext.Provider
      options={{
        input: { ...rest, data, config, ...defaultConfig },
      }}
    >
      {children}
    </AppShellContext.Provider>
  )
}

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

  const pinLeftPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_PIN_LEFT" })
  const pinRightPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_PIN_RIGHT" })
  const pinBottomPanel = () => sendToAppShell({ type: "TOGGLE_PANEL_PIN_BOTTOM" })

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
    pinLeftPanel,
    pinRightPanel,
    pinBottomPanel
  }
}

