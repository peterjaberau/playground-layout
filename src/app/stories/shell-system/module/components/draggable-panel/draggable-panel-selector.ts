"use client"

import { useCallback } from "react"
import { useSelector } from "@xstate/react"

import { DraggablePanelContext } from "./draggable-panel-provider"
import type { DraggablePanelMode } from "./draggable-panel-machine"

export function useDraggablePanel() {
  const draggablePanelRef = DraggablePanelContext.useActorRef()
  const context = useSelector(draggablePanelRef, (state) => state.context)

  const setExpanded = useCallback(
    (isExpanded: boolean) => {
      draggablePanelRef.send({ type: "SET_EXPANDED", isExpanded })
      context.onExpandChange?.(isExpanded)
    },
    [context.onExpandChange, draggablePanelRef],
  )
  const setMode = useCallback(
    (mode: DraggablePanelMode) => {
      draggablePanelRef.send({ type: "SET_MODE", mode })
      context.onModeChange?.(mode)
    },
    [context.onModeChange, draggablePanelRef],
  )
  const syncExpanded = useCallback((isExpanded: boolean) => draggablePanelRef.send({ type: "SET_EXPANDED", isExpanded }), [draggablePanelRef])
  const syncMode = useCallback((mode: DraggablePanelMode) => draggablePanelRef.send({ type: "SET_MODE", mode }), [draggablePanelRef])
  const startResize = useCallback(() => draggablePanelRef.send({ type: "START_RESIZE" }), [draggablePanelRef])
  const stopResize = useCallback(() => draggablePanelRef.send({ type: "STOP_RESIZE" }), [draggablePanelRef])

  return {
    ...context,
    canResize: context.isExpanded,
    isVertical: context.placement === "top" || context.placement === "bottom",
    setExpanded,
    setMode,
    syncExpanded,
    syncMode,
    startResize,
    stopResize,
  }
}
