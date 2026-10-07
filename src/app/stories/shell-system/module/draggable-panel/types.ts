import type { NumberSize, Size } from "re-resizable"
import type { CSSProperties, HTMLAttributes } from "react"
import type { Props as RndProps } from "react-rnd"
import type {
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";


export type DivProps = HTMLAttributes<HTMLDivElement>

export type PlacementType = "right" | "left" | "top" | "bottom"

export interface DraggablePanelProps extends DivProps {
  backgroundColor?: string
  classNames?: {
    content?: string
    handle?: string
  }
  defaultExpand?: boolean
  defaultSize?: Partial<Size>
  destroyOnClose?: boolean
  expand?: boolean
  expandable?: boolean
  fullscreen?: boolean
  headerHeight?: number
  maxHeight?: number
  maxWidth?: number
  minHeight?: number
  minWidth?: number
  mode?: "fixed" | "float"
  onExpandChange?: (expand: boolean) => void
  onSizeChange?: (delta: NumberSize, size?: Size) => void
  onSizeDragging?: (delta: NumberSize, size?: Size) => void
  pin?: boolean
  placement: PlacementType
  resize?: RndProps["enableResizing"]
  /**
   * Whether to show border
   * @default true
   */
  showBorder?: boolean
  showHandleHighlight?: boolean
  showHandleWideArea?: boolean
  size?: Partial<Size>
  styles?: {
    content?: CSSProperties
    handle?: CSSProperties
  },
  css?: any
}

export interface DraggablePanelHeaderProps extends Omit<DivProps, "children"> {
  pin?: boolean
  position?: "left" | "right"
  setExpand?: (expand: boolean) => void
  setPin?: (pin: boolean) => void
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
export type DraggablePanelParentComponent = ForwardRefExoticComponent<
  PropsWithoutRef<DraggablePanelProps> & RefAttributes<HTMLDivElement>
>
export type DraggablePanelComponent = DraggablePanelParentComponent & {
  Body: DraggablePanelBodyComponent
  Container: DraggablePanelContainerComponent
  Footer: DraggablePanelFooterComponent
  Header: DraggablePanelHeaderComponent
}


export type DraggablePanelAction =
  | { type: "START_RESIZE" }
  | { type: "STOP_RESIZE" }
  | { payload: boolean; type: "SET_SHOW_EXPAND" }

// State reducer for better state management
export interface DraggablePanelState {
  isResizing: boolean
  showExpand: boolean
}
