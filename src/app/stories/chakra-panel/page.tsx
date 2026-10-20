"use client"

import { Flex, Box, Button, ClientOnly, FloatingPanel, IconButton, Portal, Text, useFloatingPanel, Stack, Card, Wrap } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

const resizeTriggerOptions = [
  { axis: "n", label: "North" },
  { axis: "s", label: "South" },
  { axis: "e", label: "East" },
  { axis: "w", label: "West" },
  { axis: "ne", label: "North-East" },
  { axis: "nw", label: "North-West" },
  { axis: "se", label: "South-East" },
  { axis: "sw", label: "South-West" },
] as const

type ResizeTriggerAxis = (typeof resizeTriggerOptions)[number]["axis"]

const placementOptions = ["top", "left", "right", "bottom", "custom"] as const

type PanelPlacement = (typeof placementOptions)[number]

const modeOptions = ["push", "overlay", "floating"] as const

type PanelMode = (typeof modeOptions)[number]

export default function Page() {
  const boundaryRef = useRef<HTMLDivElement>(null)
  const hasOpenedRef = useRef(false)
  const [innerPanelElement, setInnerPanelElement] = useState<HTMLDivElement | null>(null)
  const [innerPanelSize, setInnerPanelSize] = useState({ width: 0, height: 0 })
  const [floatingPanelRect, setFloatingPanelRect] = useState({
    position: { x: 0, y: 0 },
    size: { width: 280, height: 180 },
  })
  const [panelState, setPanelState] = useState({
    modes: "floating" as PanelMode,
    placements: "left" as PanelPlacement,
    resizeTrigger: {
      n: true,
      s: true,
      e: true,
      w: true,
      ne: true,
      nw: true,
      se: true,
      sw: true,
    },
  })
  const floatingPanel = useFloatingPanel({
    persistRect: true,
    allowOverflow: false,
    getBoundaryEl: () => boundaryRef.current,
    defaultSize: { width: 280, height: 180 },
    minSize: { width: 280, height: 180 },
    position: floatingPanelRect.position,
    size: floatingPanelRect.size,
    onPositionChange: ({ position }) => {
      setFloatingPanelRect((current) => ({ ...current, position }))
    },
    onSizeChange: ({ size }) => {
      setFloatingPanelRect((current) => ({ ...current, size }))
    },
  })

  useEffect(() => {
    if (!innerPanelElement) return

    const updateSize = () => {
      const rect = innerPanelElement.getBoundingClientRect()
      setInnerPanelSize({ width: rect?.width ?? 0, height: rect?.height ?? 0 })
    }
    const observer = new ResizeObserver(updateSize)
    observer.observe(innerPanelElement)
    updateSize()

    return () => observer.disconnect()
  }, [innerPanelElement])

  const toggleResizeTrigger = (axis: ResizeTriggerAxis) => {
    setPanelState((current) => ({
      ...current,
      resizeTrigger: {
        ...current.resizeTrigger,
        [axis]: !current.resizeTrigger[axis],
      },
    }))
  }

  const dockPanel = (placement: Exclude<PanelPlacement, "custom">, mode: PanelMode) => {
    if (!boundaryRef.current) return

    const boundary = boundaryRef.current.getBoundingClientRect()
    const currentSize = floatingPanel.size
    const isVertical = placement === "left" || placement === "right"
    const size =
      mode === "push"
        ? isVertical
          ? { width: boundary.width / 4, height: boundary.height }
          : { width: boundary.width, height: boundary.height / 2 }
        : isVertical
          ? { width: currentSize.width, height: boundary.height }
          : { width: boundary.width, height: currentSize.height }

    floatingPanel.setSize(size)

    if (mode === "push") {
      floatingPanel.setPosition({ x: 0, y: 0 })
      return
    }

    floatingPanel.setPosition(
      {
        top: { x: boundary.left, y: boundary.top },
        left: { x: boundary.left, y: boundary.top },
        right: { x: boundary.right - size.width, y: boundary.top },
        bottom: { x: boundary.left, y: boundary.bottom - size.height },
      }[placement],
    )
  }

  const fitDockedPanel = (placement: Exclude<PanelPlacement, "custom">, mode: Exclude<PanelMode, "floating">) => {
    if (!boundaryRef.current) return

    const boundary = boundaryRef.current.getBoundingClientRect()
    const isVertical = placement === "left" || placement === "right"
    const size = isVertical ? { width: floatingPanel.size.width, height: boundary.height } : { width: boundary.width, height: floatingPanel.size.height }

    floatingPanel.setSize(size)

    if (mode === "overlay") {
      floatingPanel.setPosition(
        {
          top: { x: boundary.left, y: boundary.top },
          left: { x: boundary.left, y: boundary.top },
          right: { x: boundary.right - size.width, y: boundary.top },
          bottom: { x: boundary.left, y: boundary.bottom - size.height },
        }[placement],
      )
    }
  }

  const setPlacement = (placement: PanelPlacement) => {
    setPanelState((current) => ({ ...current, placements: placement }))
    if (placement !== "custom") dockPanel(placement, panelState.modes)
  }

  const setMode = (mode: PanelMode) => {
    setPanelState((current) => ({ ...current, modes: mode }))
    if (mode !== "floating" && panelState.placements !== "custom") fitDockedPanel(panelState.placements, mode)
  }

  const isPushMode = panelState.modes === "push"
  const isPushPanelOpen = isPushMode && floatingPanel.open
  const isFloatingMode = panelState.modes === "floating"
  const isVerticalPlacement = panelState.placements === "left" || panelState.placements === "right"
  const isPanelFirst = panelState.placements === "left" || panelState.placements === "top"
  const allowedResizeAxes: ResizeTriggerAxis[] = isFloatingMode
    ? resizeTriggerOptions.map(({ axis }) => axis)
    : (
        {
          top: ["s"],
          left: ["e"],
          right: ["w"],
          bottom: ["n"],
          custom: [],
        } satisfies Record<PanelPlacement, ResizeTriggerAxis[]>
      )[panelState.placements]
  const panelContent = (
    <FloatingPanel.Positioner
      css={
        isPushMode
          ? {
              position: "relative !important",
              inset: "auto !important",
              transform: "none !important",
              width: "100% !important",
              height: "100% !important",
            }
          : undefined
      }
    >
      <FloatingPanel.Content>
        <FloatingPanel.Header>
          {isFloatingMode ? (
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Bounded Panel</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
          ) : (
            <FloatingPanel.Title>Bounded Panel</FloatingPanel.Title>
          )}
          <FloatingPanel.Control>
            <FloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <LuX />
              </IconButton>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Control>
        </FloatingPanel.Header>
        <FloatingPanel.Body>
          <Text textStyle="sm">This panel cannot be dragged outside the dashed boundary box.</Text>
        </FloatingPanel.Body>
        {resizeTriggerOptions.map(({ axis }) => allowedResizeAxes.includes(axis) && panelState.resizeTrigger[axis] && <FloatingPanel.ResizeTrigger key={axis} axis={axis} />)}
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  )
  const innerPanel = (
    <Box
      ref={setInnerPanelElement}
      data-id="inner-panel"
      {...(isPushPanelOpen ? { flex: "1" } : { w: "full", h: "full" })}
      minW="0"
      minH="0"
      display="grid"
      placeItems="center"
      bg="bg.muted"
      borderRadius="l2"
    >
      <Text textStyle="sm">
        Inner panel: {Math.round(innerPanelSize.width)}px × {Math.round(innerPanelSize.height)}px
      </Text>
    </Box>
  )
  const pushPanel = (
    <Box flexShrink="0" w={isVerticalPlacement ? `${floatingPanel.size.width}px` : "100%"} h={isVerticalPlacement ? "100%" : `${floatingPanel.size.height}px`}>
      {panelContent}
    </Box>
  )

  return (
    <ClientOnly>
      <FloatingPanel.RootProvider value={floatingPanel}>
        <Flex w="full">
          <Stack data-id={"control-panel"} bg={"bg.subtle"} width={"400px"} p={4}>
            <Card.Root size={"sm"}>
              <Card.Header>
                <Card.Title>Trigger</Card.Title>
              </Card.Header>
              <Card.Body>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const nextOpen = !floatingPanel.open
                    if (nextOpen && !hasOpenedRef.current && panelState.placements !== "custom") {
                      dockPanel(panelState.placements, panelState.modes)
                      hasOpenedRef.current = true
                    }
                    floatingPanel.setOpen(nextOpen)
                  }}
                >
                  {floatingPanel.open ? "Close Panel" : "Open Panel"}
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root size={"sm"}>
              <Card.Header>
                <Card.Title>Modes</Card.Title>
              </Card.Header>
              <Card.Body>
                <Wrap>
                  {modeOptions.map((mode) => (
                    <Button key={mode} variant={panelState.modes === mode ? "solid" : "outline"} size="sm" onClick={() => setMode(mode)}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Button>
                  ))}
                </Wrap>
              </Card.Body>
            </Card.Root>
            <Card.Root size={"sm"}>
              <Card.Header>
                <Card.Title>Placements</Card.Title>
              </Card.Header>
              <Card.Body>
                <Wrap>
                  {placementOptions.map((placement) => (
                    <Button
                      key={placement}
                      variant={panelState.placements === placement ? "solid" : "outline"}
                      size="sm"
                      disabled={placement === "custom" && panelState.modes !== "floating"}
                      onClick={() => setPlacement(placement)}
                    >
                      {placement.charAt(0).toUpperCase() + placement.slice(1)}
                    </Button>
                  ))}
                </Wrap>
              </Card.Body>
            </Card.Root>

            <Card.Root size={"sm"}>
              <Card.Header>
                <Card.Title>Resize Trigger</Card.Title>
              </Card.Header>
              <Card.Body>
                <Wrap>
                  {resizeTriggerOptions.map(({ axis, label }) => (
                    <Button key={axis} variant={panelState.resizeTrigger[axis] ? "solid" : "outline"} size="sm" disabled={!allowedResizeAxes.includes(axis)} onClick={() => toggleResizeTrigger(axis)}>
                      {label}
                    </Button>
                  ))}
                </Wrap>
              </Card.Body>
            </Card.Root>
          </Stack>
          <Box
            data-id={"render-panel"}
            ref={boundaryRef}
            flex={1}
            position="relative"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="border.emphasized"
            borderRadius="l2"
            w="full"
            h="400px"
            p="0"
          >
            {isPushMode ? (
              <Flex direction={isVerticalPlacement ? "row" : "column"} w="full" h="full" overflow="hidden" gap="0">
                {isPushPanelOpen && isPanelFirst && pushPanel}
                {innerPanel}
                {isPushPanelOpen && !isPanelFirst && pushPanel}
              </Flex>
            ) : (
              <>
                {innerPanel}
                <Portal>{panelContent}</Portal>
              </>
            )}
          </Box>
        </Flex>
      </FloatingPanel.RootProvider>
    </ClientOnly>
  )
}
