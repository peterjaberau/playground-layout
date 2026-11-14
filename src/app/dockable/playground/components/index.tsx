"use client"

import { chakra, type HTMLChakraProps } from "@chakra-ui/react"
import { Dockable as DockableBase } from "@fragiola/dockable-react"
import type {
  AnyTypes,
  DockableTypes,
  BorderContentProps,
  BorderProps,
  BordersProps,
  DragSourceProps,
  DropZoneProps,
  PanelProps,
  PopoutProps,
  PopoutTriggerProps,
  RootProps,
  RowProps,
  SplitterProps,
  TabListProps,
  TabOverflowTriggerProps,
  TabProps,
  TabSetProps,
} from "@fragiola/dockable-react"
import type { ReactElement } from "react"

// Preserve Dockable's generic registry and render props while adding Chakra's style props.
type StyledProps<Props, Element extends "div" | "button" = "div"> = Props & Omit<HTMLChakraProps<Element>, keyof Props>

const Border = chakra(DockableBase.Border) as <T extends DockableTypes = AnyTypes>(props: StyledProps<BorderProps<T>>) => ReactElement
const BorderContent = chakra(DockableBase.BorderContent) as <T extends DockableTypes = AnyTypes>(
  props: StyledProps<BorderContentProps<T>>,
) => ReactElement
const Borders = chakra(DockableBase.Borders) as <T extends DockableTypes = AnyTypes>(props: StyledProps<BordersProps<T>>) => ReactElement
const DragSource = chakra(DockableBase.DragSource) as <T extends DockableTypes = AnyTypes>(
  props: StyledProps<DragSourceProps<T>>,
) => ReactElement
const DropZone = chakra(DockableBase.DropZone) as <T extends DockableTypes = AnyTypes>(props: StyledProps<DropZoneProps<T>>) => ReactElement
const Panel = chakra(DockableBase.Panel) as <T extends DockableTypes = AnyTypes>(props: StyledProps<PanelProps<T>>) => ReactElement
const Popout = chakra(DockableBase.Popout) as <T extends DockableTypes = AnyTypes>(props: StyledProps<PopoutProps<T>>) => ReactElement
const PopoutTrigger = chakra(DockableBase.PopoutTrigger) as <T extends DockableTypes = AnyTypes>(
  props: StyledProps<PopoutTriggerProps<T>, "button">,
) => ReactElement | null
const Root = chakra(DockableBase.Root) as <T extends DockableTypes = AnyTypes>(props: StyledProps<RootProps<T>>) => ReactElement
const Row = chakra(DockableBase.Row) as <T extends DockableTypes = AnyTypes>(props: StyledProps<RowProps<T>>) => ReactElement
const Splitter = chakra(DockableBase.Splitter) as <T extends DockableTypes = AnyTypes>(props: StyledProps<SplitterProps<T>>) => ReactElement
const Tab = chakra(DockableBase.Tab) as <T extends DockableTypes = AnyTypes>(props: StyledProps<TabProps<T>>) => ReactElement
const TabList = chakra(DockableBase.TabList) as <T extends DockableTypes = AnyTypes>(props: StyledProps<TabListProps<T>>) => ReactElement
const TabOverflowTrigger = chakra(DockableBase.TabOverflowTrigger) as <T extends DockableTypes = AnyTypes>(
  props: StyledProps<TabOverflowTriggerProps<T>, "button">,
) => ReactElement | null
const TabSet = chakra(DockableBase.TabSet) as <T extends DockableTypes = AnyTypes>(props: StyledProps<TabSetProps<T>>) => ReactElement

export const Dockable = {
  Border,
  BorderContent,
  Borders,
  DragGroup: DockableBase.DragGroup,
  DragSource,
  DropIndicator: chakra(DockableBase.DropIndicator),
  DropZone,
  EdgeIndicator: chakra(DockableBase.EdgeIndicator),
  Panel,
  // Panels and DragGroup compose context/portals rather than render an element to style.
  Panels: DockableBase.Panels,
  Popout,
  PopoutTrigger,
  Root,
  Row,
  Splitter,
  Tab,
  TabList,
  TabOverflowTrigger,
  TabSet,
  TabSetContent: chakra(DockableBase.TabSetContent),
}

export * from "@fragiola/dockable-react"
