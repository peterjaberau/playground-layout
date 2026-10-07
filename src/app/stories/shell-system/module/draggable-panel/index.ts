"use client"

import {
  DraggablePanel as DraggablePanelParent,
  DraggablePanelBody,
  DraggablePanelContainer,
  DraggablePanelFooter,
  DraggablePanelHeader,
} from "./draggable-panel"
export * from "./constants"
import type { DraggablePanelComponent } from "./types"

export const DraggablePanel = DraggablePanelParent as unknown as DraggablePanelComponent

DraggablePanel.Container = DraggablePanelContainer
DraggablePanel.Body = DraggablePanelBody
DraggablePanel.Footer = DraggablePanelFooter
DraggablePanel.Header = DraggablePanelHeader

export { DraggablePanelBody, DraggablePanelContainer, DraggablePanelFooter, DraggablePanelHeader }
