"use client"

import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useTransition } from "react"
import useControlledState from "use-merge-value"
import isEqual from "fast-deep-equal"
import { Resizable } from "re-resizable"

import { reversePlacement, draggablePanelReducer } from "./utils"

import type { Enable, NumberSize, Size } from "re-resizable"
import { DraggablePanelProps, DraggablePanelHeaderProps, DraggablePanelState } from "./types"

import { IconButton, chakra, useSlotRecipe } from "@chakra-ui/react"
import { LuPanelLeft as PanelLeft, LuPanelRight as PanelRight, LuPanelBottom as PanelBottom } from "react-icons/lu"
import { MdCenterFocusStrong as PushModeIcon, MdOutlineCenterFocusStrong as OverlayModeIcon } from "react-icons/md"

import { draggablePanelRecipe } from "./draggable-panel-recipe"

export const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { mode = "push", panelPlacement = "left", setMode, setExpand, title, position = "left", ...rest } = props

  const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
  const styles = recipe({ mode, position })

  const PanelIcon = panelPlacement === "right" ? PanelRight : panelPlacement === "bottom" ? PanelBottom : PanelLeft
  const panelIcon = (
    <IconButton size="xs" variant={"ghost"} onClick={() => setExpand?.(false)}>
      <PanelIcon />
    </IconButton>
  )
  const modeIcon = (
    <IconButton onClick={() => setMode?.(mode === "push" ? "overlay" : "push")} size={"xs"} variant={mode === "push" ? "subtle" : "ghost"}>
      {mode === "push" ? <PushModeIcon /> : <OverlayModeIcon />}
    </IconButton>
  )
  return (
    <chakra.div data-part={"draggable-panel-header"} css={styles.header} {...rest}>
      {position === "left" ? panelIcon : modeIcon}
      {title}
      {position === "left" ? modeIcon : panelIcon}
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

export const DraggablePanel = memo<DraggablePanelProps>(
  ({
    headerHeight = 0,
    fullscreen,
    maxHeight,
    pin = true,
    mode = "push",
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
    onExpandChange,
    className,
    destroyOnClose,
    classNames,
    dir,
    css,
  }) => {
    const isVertical = placement === "top" || placement === "bottom"
    const [isPending, startTransition] = useTransition()

    // Preserve the existing pin interaction implementation for consumers that
    // opt into it. AppShell leaves this pinned so overlay panels stay open.
    const hoverTimeoutRef = useRef<any>(undefined)

    const cssVariables = useMemo<Record<string, string>>(
      () => ({
        "--draggable-panel-bg": backgroundColor || "",
        "--draggable-panel-header-height": `${headerHeight}px`,
      }),
      [backgroundColor, headerHeight],
    )

    const [isExpand, setIsExpand] = useControlledState(defaultExpand, {
      onChange: onExpandChange,
      value: expand,
    } as any)

    const recipe = useSlotRecipe({ recipe: draggablePanelRecipe })
    const stylesFromRecipe = recipe({
      mode,
      placement,
      expand: isExpand,
      showBorder,
      showHandleHighlight,
      fullscreen,
    })

    const initialState: DraggablePanelState = {
      isResizing: false,
    }

    const [state, dispatch] = useReducer(draggablePanelReducer, initialState)

    // Existing hover-driven expansion behaviour for unpinned consumers.
    useEffect(() => {
      if (pin) return

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      if (!isExpand) {
        hoverTimeoutRef.current = setTimeout(() => {
          startTransition(() => {
            setIsExpand(false)
          })
        }, 150)
      } else {
        startTransition(() => {
          setIsExpand(true)
        })
      }
    }, [pin, isExpand])

    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
      }
    }, [])

    const canResizing = resize !== false && isExpand

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
      if (!isExpand) {
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
    }, [isExpand, isVertical, defaultSize, maxHeight, maxWidth, minHeight, minWidth, size])

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
      dispatch({ type: "START_RESIZE" })
    }, [])

    const handleResizeStop = useCallback(
      (_event: unknown, _direction: unknown, reference_: HTMLElement, delta: NumberSize) => {
        dispatch({ type: "STOP_RESIZE" })
        onSizeChange?.(delta, {
          height: reference_.style.height,
          width: reference_.style.width,
        })
      },
      [onSizeChange],
    )

    // Main panel content
    const inner = useMemo(
      () => (
        <Resizable
          data-part={"draggable-panel-inner"}
          data-transition-pending={isPending}
          data-transition-resizing={state.isResizing}
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
            opacity: isPending ? 0.95 : 1,
            transition: state.isResizing ? "unset" : undefined,
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
        state.isResizing,
        isPending,
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
        {destroyOnClose ? isExpand && inner : inner}
      </chakra.div>
    )
  },
  isEqual,
)
