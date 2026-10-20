"use client"

import { createActorContext } from "@xstate/react"
import type { ReactNode } from "react"

import { draggablePanelMachine, type DraggablePanelMachineContext } from "./draggable-panel-machine"

export const DraggablePanelContext = createActorContext(draggablePanelMachine)

interface DraggablePanelProviderProps {
  children: ReactNode
  initialContext: Omit<DraggablePanelMachineContext, "isResizing">
}

export function DraggablePanelProvider({ children, initialContext }: DraggablePanelProviderProps) {
  return <DraggablePanelContext.Provider options={{ input: initialContext }}>{children}</DraggablePanelContext.Provider>
}
