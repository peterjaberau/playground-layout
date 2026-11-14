"use client"

import { type BorderNode, Dockable, type Model, type RowNode, type TabOf, type TabsetNode, useModelState, veto } from "../components"
import { Bug, FolderTree, GitBranch, SquareTerminal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button, Dialog, Portal, Tooltip } from "@chakra-ui/react"
import { Explorer } from "./explorer"
import { EditorPanel, ProblemsPanel, TerminalPanel } from "./panels"
import { chakra } from "@chakra-ui/react"
import { WorkbenchTabSet } from "./tabs"
import {
  activePath,
  createWorkspace,
  defaultLayout,
  dirtyPaths,
  editorData,
  forgetLayout,
  openFile,
  restoreModel,
  saveLayout,
  type Types,
} from "./workspace"

// A code-editor workbench. The explorer (a start border) and the terminal and problems (a bottom
// border) are borders around the editors; the explorer and the status bar change the layout with
// commands on the model (`model.run`); the tabs follow their content (a dot while modified);
// closing a modified tab is stopped by a middleware (`model.use`), whatever closed it (button,
// menu, Ctrl+Delete); and the layout is saved on every change (`model.subscribe`, `toJSON`) and
// restored on the next visit (`createModel`, which reports a stored layout that is not valid).

export default function IdeWorkbench() {
  const [workspace] = useState(createWorkspace)
  // the model, restored from storage; `problem` says why a stored layout was not used
  const [restored] = useState(restoreModel)
  const { model } = restored
  const [problem, setProblem] = useState(restored.problem)
  // tabs waiting for an answer to "save changes?", and the ones already answered
  const [pending, setPending] = useState<string[]>([])
  const confirmed = useRef(new Set<string>())

  // The policy: closing a modified editor asks first. The middleware sees every `tab.close`,
  // from any button, menu or key; it vetoes the close and queues the question, and the dialog
  // runs the close again once answered. A dry run (`model.can`, which decides whether the close
  // button and shortcut are offered) passes: the tab may close, after the question.
  useEffect(
    () =>
      model.use((ctx, next) => {
        if (ctx.command !== "tab.close" || ctx.dryRun) {
          return next()
        }
        const id = ctx.payload.tabId
        if (!editorData(ctx.get("node-by", { id }))?.dirty) {
          return next()
        }
        if (confirmed.current.delete(id)) {
          return next()
        }
        setPending((ids) => (ids.includes(id) ? ids : [...ids, id]))
        return veto("the file has unsaved changes")
      }),
    [model],
  )

  // every change is saved (a drag's transient steps once, at its end)
  useEffect(
    () =>
      model.subscribe((event) => {
        if (!event.transient) saveLayout(model)
      }),
    [model],
  )

  const open = (path: string) => openFile(model, path)

  // the same model loads the default layout: open editors keep their content
  const resetLayout = () => {
    forgetLayout()
    setProblem(undefined)
    model.run("layout.load", { layout: defaultLayout })
  }

  // answer the first pending question
  const pendingNode = pending[0] ? model.get("node-by", { id: pending[0] }) : undefined
  const pendingData = editorData(pendingNode)
  const answer = (choice: "save" | "discard" | "cancel") => {
    const id = pending[0]
    setPending((ids) => ids.slice(1))
    if (!id || !pendingData || choice === "cancel") return
    if (choice === "save") workspace.save(pendingData.path)
    else workspace.discard(pendingData.path)
    confirmed.current.add(id)
    model.run("tab.close", { tabId: id })
  }

  const renderContent = (tab: TabOf<Types>) => {
    switch (tab.component) {
      case "editor":
        return <EditorPanel tab={tab} workspace={workspace} />
      case "terminal":
        return <TerminalPanel workspace={workspace} />
      case "problems":
        return <ProblemsPanel onOpen={open} />
      case "explorer":
        return <Explorer model={model} onOpen={open} onResetLayout={resetLayout} />
    }
  }

  return (
    <chakra.div
      css={{
        display: "flex",
        height: "100vh",
        minHeight: 0,
        flexDirection: "column",
        fontFamily: "system-ui",
        color: "#d9e1ec",
      }}
    >
      {problem ? (
        <chakra.div
          role="alert"
          data-testid="restore-problem"
          css={{ display: "flex", gap: "12px", padding: "8px 12px", fontSize: "12px" }}
        >
          <chakra.div css={{ minWidth: 0, flex: 1 }}>
            <chakra.p>The saved layout could not be restored, so the default one is shown: {problem.message}</chakra.p>
            {problem.issues.length > 0 ? (
              <chakra.ul css={{ marginTop: "4px", fontFamily: "monospace" }}>
                {problem.issues.map((issue) => (
                  <chakra.li key={`${issue.path} ${issue.message}`}>{`${issue.path || "/"}: ${issue.message}`}</chakra.li>
                ))}
              </chakra.ul>
            ) : null}
          </chakra.div>
          <chakra.button type="button" onClick={() => setProblem(undefined)} css={{ padding: "2px 8px", cursor: "pointer" }}>
            Dismiss
          </chakra.button>
        </chakra.div>
      ) : null}
      <chakra.div
        css={{
          display: "flex",
          minHeight: 0,
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Dockable.Root
          model={model}
          css={{
            "--dk-font": "system-ui, -apple-system, 'Segoe UI', sans-serif",
            "--dk-tab-font": "ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace",
            "--dk-tab-size": "0.75rem",
            "--dk-radius": "0px",
            "--dk-tab-radius": "0px",
            "--dk-tab-height": "1.75rem",
            "--dk-tab-gap": "0px",
            "--dk-gap": "0px",
            "--dk-border": "0px",
            "--dk-shadow": "none",
            "--dk-splitter-size": "6px",
            "--dk-splitter-grab": "6px",
            "--dk-splitter-bg": "transparent",
            "--dk-grip": "none",
            "--dk-strip-padding": "0.375rem",
            "--dk-indicator-style": "solid",
            "--dk-motion": "150ms",
            "--dk-tab-divider": "0px",
            "--dk-tab-divider-color": "colors.border",
            "--dk-tab-marker": "block",
            "--dk-tab-marker-color": "oklch(0.55 0.2 250)",
            "--dk-panel-texture": "none",
            "--dk-tab-selected-bg": "oklch(0.93 0.004 250)",
            "--dk-tab-selected-fg": "oklch(0.15 0.01 250)",
            "--dk-strip-bg": "colors.transparent",
            "--dk-tabset-active-line": "oklch(0.86 0.004 250)",
            minHeight: 0,
            flex: 1,
          }}
        >
          <Dockable.Borders renderBar={(border) => <Border node={border} />} renderContent={(border) => <BorderContent node={border} />}>
            <Dockable.Row renderSplitter={(props) => <Splitter {...props} />}>{renderNode}</Dockable.Row>
          </Dockable.Borders>
          <Dockable.Panels<Types>>
            {(tab) => (
              <Dockable.Panel node={tab} css={{ overflow: "auto",
                // backgroundColor: "#1e2430",
                color: "#d9e1ec" }}>
                {renderContent(tab)}
              </Dockable.Panel>
            )}
          </Dockable.Panels>
          <Dockable.DropIndicator
            css={{ zIndex: 20, border: "2px solid #60a5fa",
              backgroundColor: "rgba(96,165,250,.2)",
              borderRadius: "4px" }}
          />
        </Dockable.Root>
      </chakra.div>

      <StatusBar model={model} />

      <Dialog.Root
        role="alertdialog"
        open={pendingData !== undefined}
        onOpenChange={({ open }) => {
          if (!open) answer("cancel")
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{`Save changes to ${pendingNode?.type === "tab" ? pendingNode.label : ""}?`}</Dialog.Title>
                <Dialog.Description>Your changes will be lost if you close the file without saving.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button variant="ghost" size="sm" onClick={() => answer("discard")}>
                  Don't save
                </Button>
                <Button variant="outline" size="sm" onClick={() => answer("cancel")}>
                  Cancel
                </Button>
                <Button size="sm" colorPalette="blue" onClick={() => answer("save")}>
                  Save
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </chakra.div>
  )
}

/** The status bar follows the model: a commit re-renders it, not the layout. */
function StatusBar({ model }: { model: Model<Types> }) {
  const unsaved = useModelState(() => dirtyPaths(model).size, { model })
  const path = useModelState(() => activePath(model), { model })
  return (
    <chakra.footer
      css={{
        display: "flex",
        height: "24px",
        flexShrink: 0,
        alignItems: "center",
        gap: "16px",
        backgroundColor: "#2563a6",
        padding: "0 12px",
        fontSize: "12px",
        color: "white",
      }}
    >
      <chakra.span css={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <GitBranch aria-hidden="true" style={{ width: "14px", height: "14px" }} />
        main
      </chakra.span>
      <chakra.span data-testid="unsaved-count">{unsaved === 1 ? "1 unsaved file" : `${unsaved} unsaved files`}</chakra.span>
      <chakra.span css={{ marginInlineStart: "auto" }}>{path ?? ""}</chakra.span>
    </chakra.footer>
  )
}

function renderNode(node: TabsetNode<Types> | RowNode<Types>) {
  if (node.type === "row") {
    return (
      <Dockable.Row node={node} renderSplitter={(props) => <Splitter {...props} />}>
        {renderNode}
      </Dockable.Row>
    )
  }
  return <WorkbenchTabSet node={node} />
}

const BORDER_ICONS: Partial<Record<TabOf<Types>["component"], typeof FolderTree>> = {
  explorer: FolderTree,
  terminal: SquareTerminal,
  problems: Bug,
}

/**
 * A border's strip. The start border is an activity bar, as in VS Code: an upright icon per tab,
 * named by `aria-label` and a tooltip, in a bar as wide as its icon buttons. The bottom border's
 * tabs keep their icon and name.
 */
function Border({ node }: { node: BorderNode }) {
  const side = node.location === "start" || node.location === "end"
  return (
    <Dockable.Border
      node={node}
      css={{
        flexShrink: 0,
        // backgroundColor: "#252c38",
        color: "var(--palette-contrast, #d9e1ec)",
        borderColor: "var(--palette-line, #3c4656)",
        "&[data-orientation=vertical]": { width: "2.5rem" },
        "&[data-orientation=horizontal]": { height: "var(--dk-tab-height)" },
        "&[data-location=start]": { borderInlineEndWidth: "1px", borderStyle: "solid" },
        "&[data-location=end]": { borderInlineStartWidth: "1px", borderStyle: "solid" },
        "&[data-location=top]": { borderBottomWidth: "1px", borderStyle: "solid" },
        "&[data-location=bottom]": { borderTopWidth: "1px", borderStyle: "solid" },
        "&[data-drop-target]": { backgroundColor: "var(--palette-soft, #394454)" },
      }}
    >
      <Dockable.TabList<Types>
        aria-label={`${node.location} panels`}
        css={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          gap: "2px",
          padding: "4px",
          "&[data-orientation=vertical]": { flexDirection: "column" },
        }}
      >
        {(tab) => {
          const Icon = BORDER_ICONS[tab.component]
          const icon = Icon ? <Icon aria-hidden="true" style={{ width: "16px", height: "16px", flexShrink: 0 }} /> : null
          return (
            <Dockable.Tab
              node={tab}
              // an icon-only tab is named by its tab's name
              aria-label={side ? tab.label : undefined}
              // upright and centred in a side bar
              css={{
                display: "flex",
                flexShrink: 0,
                cursor: "pointer",
                alignItems: "center",
                gap: "6px",
                borderRadius: "3px",
                fontSize: "13px",
                padding: side ? "8px" : "4px 8px",
                justifyContent: side ? "center" : undefined,
                _hover: { backgroundColor: "#394454" },
                "&[data-selected]": { backgroundColor: "#394454", color: "white" },
              }}
            >
              {side ? (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <chakra.span css={{ display: "grid", placeItems: "center" }}>{icon}</chakra.span>
                  </Tooltip.Trigger>
                  <Portal>
                    <Tooltip.Positioner>
                      <Tooltip.Content>{tab.label}</Tooltip.Content>
                    </Tooltip.Positioner>
                  </Portal>
                </Tooltip.Root>
              ) : (
                <>
                  {icon}
                  {tab.label}
                </>
              )}
            </Dockable.Tab>
          )
        }}
      </Dockable.TabList>
    </Dockable.Border>
  )
}

function BorderContent({ node }: { node: BorderNode }) {
  return (
    <Dockable.BorderContent
      node={node}
      renderSplitter={(border) => <Splitter node={border} />}
    />
  )
}

function Splitter({ node, index }: { node: RowNode | BorderNode; index?: number }) {
  return (
    <Dockable.Splitter
      node={node}
      index={index}
      aria-label="Resize"
      css={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--dk-splitter-bg)",
        outline: "none",
        "&[data-orientation=vertical]": {
          cursor: "ew-resize",
          width: "var(--dk-splitter-size)",
          outline: "none",
          _after: {
            insetInlineStart: "calc(1/2 * 100%)",
            insetBlock: "0px",
            start: "50%",
            width: "var(--dk-splitter-grab)",
            transform: "translateX(-50%)",
          },
        },
        "&[data-orientation=horizontal]": {
          height: "var(--dk-splitter-size)",
          cursor: "ns-resize",
          _after: {
            insetInline: 0,
            top: "50%",
            height: "var(--dk-splitter-grab)",
            transform: "translateY(-50%)",
          },
        },
        _hover: { backgroundColor: "#60a5fa" },
      }}
    >
      <chakra.span aria-hidden="true" css={{ display: "none" }} />
    </Dockable.Splitter>
  )
}
