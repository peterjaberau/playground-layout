import type { NumberSize, Size } from "re-resizable"
import type { HTMLAttributes } from "react"
import type { Props as RndProps } from "react-rnd"
import type { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react"

export type DivProps = HTMLAttributes<HTMLDivElement>

export type PlacementType = "right" | "left" | "top" | "bottom"

export interface DraggablePanelProps extends DivProps {
  backgroundColor?: string
  classNames?: {
    content?: string
  }
  defaultExpand?: boolean
  defaultSize?: Partial<Size>
  destroyOnClose?: boolean
  expand?: boolean
  fullscreen?: boolean
  headerHeight?: number
  maxHeight?: number
  maxWidth?: number
  minHeight?: number
  minWidth?: number
  /**
   * `push` participates in layout flow; `overlay` is positioned above content.
   * @default "push"
   */
  mode?: "push" | "overlay"
  onExpandChange?: (expand: boolean) => void
  onSizeChange?: (delta: NumberSize, size?: Size) => void
  onSizeDragging?: (delta: NumberSize, size?: Size) => void
  /**
   * Preserves the panel's existing pinned interaction: when false, the panel
   * uses its hover-driven expansion behaviour.
   */
  pin?: boolean
  placement: PlacementType
  resize?: RndProps["enableResizing"]
  /**
   * Whether to show border
   * @default true
   */
  showBorder?: boolean
  showHandleHighlight?: boolean
  size?: Partial<Size>
  css?: any
}

export interface DraggablePanelHeaderProps extends Omit<DivProps, "children"> {
  mode?: "push" | "overlay"
  panelPlacement?: PlacementType
  position?: "left" | "right"
  setExpand?: (expand: boolean) => void
  setMode?: (mode: "push" | "overlay") => void
  title?: string
  [key: string]: any
}

export type DraggablePanelFooterProps = DivProps

export type DraggablePanelContainerProps = DivProps

export type DraggablePanelBodyProps = DivProps

export type DraggablePanelBodyComponent = ComponentType<DraggablePanelBodyProps>
export type DraggablePanelHeaderComponent = ComponentType<DraggablePanelHeaderProps>
export type DraggablePanelFooterComponent = ComponentType<DraggablePanelFooterProps>
export type DraggablePanelContainerComponent = ComponentType<DraggablePanelContainerProps>
export type DraggablePanelParentComponent = ForwardRefExoticComponent<PropsWithoutRef<DraggablePanelProps> & RefAttributes<HTMLDivElement>>
export type DraggablePanelComponent = DraggablePanelParentComponent & {
  Body: DraggablePanelBodyComponent
  Container: DraggablePanelContainerComponent
  Footer: DraggablePanelFooterComponent
  Header: DraggablePanelHeaderComponent
}

export type DraggablePanelAction = { type: "START_RESIZE" } | { type: "STOP_RESIZE" }

// State reducer for better state management
export interface DraggablePanelState {
  isResizing: boolean
}
