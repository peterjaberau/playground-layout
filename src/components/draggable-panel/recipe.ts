import { defineSlotRecipe } from "@chakra-ui/react"

export const stylesRecipe = defineSlotRecipe({
  className: "draggable-panel",
  slots: ["root", "panel", "body", "container", "footer", "header", "handlerIcon", "resizeTrigger"],
  base: {
    root: {
      "--draggable-panel-bg": "bg.panel",
      "--draggable-panel-header-height": "0px",
      flexShrink: 0,
      flexDirection: "column",
      background: "bg.panel",
    },
    panel: {
      boxSizing: "border-box",
      position: "relative",
      userSelect: "auto",
      overflow: "hidden",

      transition: "all 0.2s ease-out",
      opacity: 1,
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    body: {
      overflow: "hidden auto",
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      flex: 1,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      position: "relative",
      overflow: "hidden",
      height: "100%",
    },
    handlerIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease-out",
    },
    header: {
      display: "flex",
      flex: "none",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: "8px",
      paddingBlock: "8px",
      paddingInline: "16px",
      borderBlockEnd: "1px solid #f0f0f0",
      fontWeight: 500,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      flex: "none",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "8px",
      paddingBlock: "8px",
      paddingInline: "16px",
      borderBlockStart: "1px solid #f0f0f0",
    },
    // Base for the resize handle element rendered via handleComponent.
    // The element fills the Resizable handle span (width/height 100%) and uses
    // a ::before pseudo-element to render the thin visual drag indicator line.
    resizeTrigger: {
      display: "block",
      width: "100%",
      height: "100%",
      position: "relative",
      background: "transparent",
      "&::before": {
        content: '""',
        position: "absolute",
        transition: "all 0.2s ease-out",
      },
    },
  },
  variants: {
    // Controls root positioning: fixed panels sit in normal flow; float panels
    // are absolutely positioned over the content area.
    mode: {
      fixed: {
        root: {
          position: "relative",
        },
      },
      float: {
        root: {
          position: "absolute",
          zIndex: 200,
        },
      },
    },

    // When fullscreen=true the panel stretches to fill the entire content area
    // (offset by the optional header height CSS variable).
    fullscreen: {
      true: {
        root: {
          position: "absolute",
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInline: "0",
          width: "100%",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
          background: "var(--draggable-panel-bg, #ffffff)",
          zIndex: 200,
        },
      },
      false: {},
    },

    // Placement drives the position of the ::before indicator line inside the
    // resize trigger.  The handle sits on the *opposite* side to placement (see
    // reversePlacement util), so the indicator is anchored accordingly:
    //   placement=right → handle is on left  → line anchored insetInlineStart
    //   placement=left  → handle is on right → line anchored insetInlineEnd
    //   placement=bottom→ handle is on top   → line anchored insetBlockStart
    //   placement=top   → handle is on bottom→ line anchored insetBlockEnd
    placement: {
      left: {
        resizeTrigger: {
          "&::before": {
            insetInlineEnd: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      right: {
        resizeTrigger: {
          "&::before": {
            insetInlineStart: "50%",
            width: "2px",
            height: "100%",
          },
        },
      },
      top: {
        resizeTrigger: {
          "&::before": {
            insetBlockEnd: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
      bottom: {
        resizeTrigger: {
          "&::before": {
            insetBlockStart: "50%",
            width: "100%",
            height: "2px",
          },
        },
      },
    },

    pin: {
      true: {},
      false: {},
    },

    expand: {
      true: {},
      false: {},
    },

    // position is consumed by sub-components such as DraggablePanelHeader to
    // determine icon layout (panel-icon left vs right).
    position: {
      left: {},
      right: {},
      top: {},
      bottom: {},
    },

    showBorder: {
      true: {},
      false: {},
    },

    // When showHandleHighlight=true the resize handle line illuminates on hover
    // and turns solid blue while actively dragging.
    showHandleHighlight: {
      true: {
        resizeTrigger: {
          "&:hover": {
            "&::before": {
              background: "#91caff",
              boxShadow: "0 0 8px color-mix(in srgb, #1677ff 25%, transparent)",
            },
          },
          "&:active": {
            "&::before": {
              background: "#1677ff",
            },
          },
        },
      },
      false: {},
    },
  },

  compoundVariants: [
    // ── Float positions ────────────────────────────────────────────────────
    // When mode=float the root is absolutely positioned; these variants add
    // the edge-anchoring so it hugs the correct side of the container.
    {
      mode: "float",
      placement: "bottom",
      css: {
        root: {
          insetBlockEnd: "0",
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    {
      mode: "float",
      placement: "top",
      css: {
        root: {
          insetBlockStart: "var(--draggable-panel-header-height, 0)",
          insetInline: "0 0",
          width: "100%",
        },
      },
    },
    {
      mode: "float",
      placement: "left",
      css: {
        root: {
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInlineStart: "0",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
        },
      },
    },
    {
      mode: "float",
      placement: "right",
      css: {
        root: {
          insetBlock: "var(--draggable-panel-header-height, 0) 0",
          insetInlineEnd: "0",
          height: "calc(100% - var(--draggable-panel-header-height, 0px))",
        },
      },
    },

    // ── Panel collapse sizing ──────────────────────────────────────────────
    // When collapsed (expand=false) clamp the cross-axis to zero so the panel
    // disappears cleanly.  Vertical panels use minHeight; horizontal use minWidth.
    {
      expand: false,
      placement: "top",
      css: { panel: { minHeight: 0 } },
    },
    {
      expand: false,
      placement: "bottom",
      css: { panel: { minHeight: 0 } },
    },
    {
      expand: false,
      placement: "left",
      css: { panel: { minWidth: 0 } },
    },
    {
      expand: false,
      placement: "right",
      css: { panel: { minWidth: 0 } },
    },

    // ── Border on opposite side to placement (only when expanded) ──────────
    // The border visually separates the panel from content.  It appears on the
    // side that faces content (opposite to placement direction).
    //   placement=top    → border on bottom edge (borderBlockEnd)
    //   placement=bottom → border on top edge    (borderBlockStart)
    //   placement=left   → border on right edge  (borderInlineEnd)
    //   placement=right  → border on left edge   (borderInlineStart)
    {
      expand: true,
      placement: "top",
      showBorder: true,
      css: { root: { borderBlockEnd: "1px solid #d9d9d9" } },
    },
    {
      expand: true,
      placement: "top",
      showBorder: false,
      css: { root: { borderBlockEndWidth: 0 } },
    },
    {
      expand: true,
      placement: "bottom",
      showBorder: true,
      css: { root: { borderBlockStart: "1px solid #d9d9d9" } },
    },
    {
      expand: true,
      placement: "bottom",
      showBorder: false,
      css: { root: { borderBlockStartWidth: 0 } },
    },
    {
      expand: true,
      placement: "left",
      showBorder: true,
      css: { root: { borderInlineEnd: "1px solid #d9d9d9" } },
    },
    {
      expand: true,
      placement: "left",
      showBorder: false,
      css: { root: { borderInlineEndWidth: 0 } },
    },
    {
      expand: true,
      placement: "right",
      showBorder: true,
      css: { root: { borderInlineStart: "1px solid #d9d9d9" } },
    },
    {
      expand: true,
      placement: "right",
      showBorder: false,
      css: { root: { borderInlineStartWidth: 0 } },
    },
  ],

  defaultVariants: {
    mode: "fixed",
    fullscreen: false,
    placement: "right",
    position: "left",
    pin: true,
    expand: true,
    showBorder: true,
    showHandleHighlight: false,
  },
})
