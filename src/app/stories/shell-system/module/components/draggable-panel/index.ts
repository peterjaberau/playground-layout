"use client"

import { DraggablePanel as DraggablePanelParent, DraggablePanelBody, DraggablePanelContainer, DraggablePanelFooter, DraggablePanelHeader } from "./draggable-panel"
import type { DraggablePanelComponent } from "./types"

export const DraggablePanel = DraggablePanelParent as unknown as DraggablePanelComponent

DraggablePanel.Container = DraggablePanelContainer
DraggablePanel.Body = DraggablePanelBody
DraggablePanel.Footer = DraggablePanelFooter
DraggablePanel.Header = DraggablePanelHeader

export { DraggablePanelBody, DraggablePanelContainer, DraggablePanelFooter, DraggablePanelHeader }
export { DraggablePanelProvider } from "./draggable-panel-provider"
export { useDraggablePanel } from "./draggable-panel-selector"
export { draggablePanelMachine } from "./draggable-panel-machine"
