"use client"

import React, { memo, useCallback, useEffect, useMemo } from "react"
import isEqual from "fast-deep-equal"
import { Resizable } from "re-resizable"

import { reversePlacement } from "./utils"

import type { Enable, NumberSize, Size } from "re-resizable"
import { DraggablePanelProps, DraggablePanelHeaderProps } from "./types"

import { IconButton, chakra, useSlotRecipe } from "@chakra-ui/react"
import { LuPanelLeft as PanelLeft, LuPanelRight as PanelRight, LuPanelBottom as PanelBottom } from "react-icons/lu"
import { MdCenterFocusStrong as PushModeIcon, MdOutlineCenterFocusStrong as OverlayModeIcon } from "react-icons/md"

import { draggablePanelRecipe } from "./draggable-panel-recipe"
import { DraggablePanelProvider } from "./draggable-panel-provider"
import { useDraggablePanel } from "./draggable-panel-selector"

export const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { title, ...rest } = props
  const { mode, placement, setExpanded, setMode } = useDraggablePanel()

  const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
  const styles = recipe({ mode })

  const ExpandIcon = placement === "right" ? PanelRight : placement === "bottom" ? PanelBottom : PanelLeft
  const expandIcon = (
    <IconButton
      size="xs"
      variant={"ghost"}
      onClick={() => {
        setExpanded(false)
      }}
    >
      <ExpandIcon />
    </IconButton>
  )
  const modeIcon = (
    <IconButton
      onClick={() => {
        const nextMode = mode === "push" ? "overlay" : "push"
        setMode(nextMode)
      }}
      size={"xs"}
      variant={mode === "push" ? "subtle" : "ghost"}
    >
      {mode === "push" ? <PushModeIcon /> : <OverlayModeIcon />}
    </IconButton>
  )
  return (
    <chakra.div data-part={"draggable-panel-header"} css={styles.header} {...rest}>
      <chakra.span flex="1">{title}</chakra.span>
      <chakra.div display="flex" alignItems="center" justifyContent="flex-end" gap="8px">
        {expandIcon}
        {modeIcon}
      </chakra.div>
    </chakra.div>
  )
})

export const DraggablePanelBody = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
  const styles = recipe()
  return <chakra.div data-part={"draggable-panel-body"} css={styles.body} {...rest} />
})

export const DraggablePanelContainer = memo(({ ...rest }: any) => {
  const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
  const styles = recipe()
  return <chakra.div data-part={"draggable-panel-container"} css={styles.container} {...rest} />
})

export const DraggablePanelFooter = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
  const styles = recipe()

  return <chakra.div css={styles.footer} {...rest} />
})

const DraggablePanelContent = memo<DraggablePanelProps>(
  ({
    headerHeight = 0,
    fullscreen,
    maxHeight,
    mode: controlledMode = "push",
    children,
    placement = "right",
    resize,
    showBorder = true,
    showHandleHighlight = false,
    backgroundColor,
    size,
    defaultSize: customizeDefaultSize,
    minWidth,
    minHeight,
    maxWidth,
    onSizeChange,
    onSizeDragging,
    expand,
    defaultExpand = true,
    className,
    destroyOnClose,
    classNames,
    dir,
    css,
  }) => {
    const { isExpanded, isResizing, isVertical, mode, syncExpanded, syncMode, startResize, stopResize } = useDraggablePanel()
    const cssVariables = useMemo<Record<string, string>>(
      () => ({
        "--draggable-panel-bg": backgroundColor || "",
        "--draggable-panel-header-height": `${headerHeight}px`,
      }),
      [backgroundColor, headerHeight],
    )

    useEffect(() => {
      syncMode(controlledMode)
    }, [controlledMode, syncMode])

    useEffect(() => {
      if (expand !== undefined) syncExpanded(expand)
    }, [expand, syncExpanded])

    const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
    const stylesFromRecipe = recipe({
      mode,
      placement,
      expand: isExpanded,
      showBorder,
      showHandleHighlight,
      fullscreen,
    })

    const canResizing = resize !== false && isExpanded

    // Configure resizing handles
    const resizing = useMemo(
      () => ({
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false,
        [reversePlacement(placement)]: true,
        ...(resize as Enable),
      }),
      [placement, resize],
    )

    // Calculate default size based on orientation
    const defaultSize: Size = useMemo(() => {
      if (isVertical)
        return {
          height: 180,
          width: "100%",
          ...customizeDefaultSize,
        }

      return {
        height: "100%",
        width: 280,
        ...customizeDefaultSize,
      }
    }, [isVertical, customizeDefaultSize])

    // Determine appropriate size props based on expand state
    const sizeProps: any = useMemo(() => {
      if (!isExpanded) {
        return isVertical ? { minHeight: 0, size: { height: 0 } } : { minWidth: 0, size: { width: 0 } }
      }

      return {
        defaultSize,
        maxHeight: typeof maxHeight === "number" ? Math.max(maxHeight, 0) : maxHeight,
        maxWidth: typeof maxWidth === "number" ? Math.max(maxWidth, 0) : maxWidth,
        minHeight: typeof minHeight === "number" ? Math.max(minHeight, 0) : minHeight,
        minWidth: typeof minWidth === "number" ? Math.max(minWidth, 0) : minWidth,
        size: size as Size,
      }
    }, [isExpanded, isVertical, defaultSize, maxHeight, maxWidth, minHeight, minWidth, size])

    // Handle resize events with memoization
    const handleResize = useCallback(
      (_: unknown, _direction: unknown, reference_: HTMLElement, delta: NumberSize) => {
        onSizeDragging?.(delta, {
          height: reference_.style.height,
          width: reference_.style.width,
        })
      },
      [onSizeDragging],
    )

    const handleResizeStart = useCallback(() => {
      startResize()
    }, [startResize])

    const handleResizeStop = useCallback(
      (_event: unknown, _direction: unknown, reference_: HTMLElement, delta: NumberSize) => {
        stopResize()
        onSizeChange?.(delta, {
          height: reference_.style.height,
          width: reference_.style.width,
        })
      },
      [onSizeChange, stopResize],
    )

    // Main panel content
    const inner = useMemo(
      () => (
        <Resizable
          data-part={"draggable-panel-inner"}
          data-transition-resizing={isResizing}
          {...sizeProps}
          className={classNames?.content}
          enable={canResizing ? (resizing as Enable) : undefined}
          handleComponent={
            canResizing
              ? {
                  [reversePlacement(placement)]: <chakra.div css={stylesFromRecipe.resizeTrigger} />,
                }
              : {}
          }
          style={{
            ...cssVariables,
            ...(stylesFromRecipe.panel as React.CSSProperties),
            transition: isResizing ? "unset" : undefined,
          }}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          {children}
        </Resizable>
      ),
      [
        sizeProps,
        classNames?.content,
        canResizing,
        resizing,
        placement,
        stylesFromRecipe.resizeTrigger,
        stylesFromRecipe.panel,
        handleResize,
        handleResizeStart,
        handleResizeStop,
        isResizing,
        children,
      ],
    )

    // For fullscreen mode, return a simpler layout
    if (fullscreen) {
      return (
        <chakra.div
          data-part={"draggable-panel-root"}
          css={{
            ...stylesFromRecipe.root,
            ...css,
          }}
          className={className}
          style={cssVariables}
        >
          {children}
        </chakra.div>
      )
    }

    return (
      <chakra.div
        data-part={"draggable-panel-root"}
        dir={dir}
        style={cssVariables}
        className={className}
        css={{
          ...stylesFromRecipe.root,
          ...css,
        }}
      >
        {destroyOnClose ? isExpanded && inner : inner}
      </chakra.div>
    )
  },
  isEqual,
)

export const DraggablePanel = memo<DraggablePanelProps>((props) => {
  const { defaultExpand = true, expand, mode = "push", placement = "right", onExpandChange, onModeChange } = props

  return (
    <DraggablePanelProvider
      initialContext={{
        isExpanded: expand ?? defaultExpand,
        mode,
        placement,
        ...(onExpandChange && { onExpandChange }),
        ...(onModeChange && { onModeChange }),
      }}
    >
      <DraggablePanelContent {...props} />
    </DraggablePanelProvider>
  )
}, isEqual)
