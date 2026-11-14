"use client"

import { Dockable, type Model, type TabOf, type TabsetNode, useDockable, useTabOverflow } from "../components"
import { Bug, Maximize2, Minimize2, SquareTerminal, X } from "lucide-react"

import { Menu, Portal } from "@chakra-ui/react"
import { FileIcon } from "./explorer"
import { chakra } from "@chakra-ui/react"
import { editorData, type Types } from "./workspace"

const StyledX = chakra(X)

// The workbench's tabset: file tabs with an icon, a dirty dot and a close button, a context
// menu per tab, a menu listing the tabs that no longer fit (tab overflow hides them; the selected
// one always stays), and a maximize button.
// Everything is a consumer choice made of Dockable primitives, commands and data-*.

/** Whether a tab may be closed at all (its `closable`, else the layout default). */
function closable(model: Model<Types>, tab: TabOf<Types>) {
  return model.get("tab-settings-by", { tabId: tab.id })?.closable === true
}

function closeAll(model: Model<Types>, tabs: readonly TabOf<Types>[]) {
  for (const tab of tabs) {
    if (closable(model, tab)) {
      // one command per tab: the workbench's middleware can still stop the dirty ones
      model.run("tab.close", { tabId: tab.id })
    }
  }
}

function TabIcon({ tab }: { tab: TabOf<Types> }) {
  switch (tab.component) {
    case "editor":
      return <FileIcon path={tab.data.path} />
    case "terminal":
      return <SquareTerminal aria-hidden="true" style={{ width: "14px", height: "14px", flexShrink: 0 }} />
    default:
      return <Bug aria-hidden="true" style={{ width: "14px", height: "14px", flexShrink: 0 }} />
  }
}

function WorkbenchTab({ tab, tabset }: { tab: TabOf<Types>; tabset: TabsetNode<Types> }) {
  const { model } = useDockable<Types>()
  const siblings = tabset.children
  const index = siblings.findIndex((other) => other.id === tab.id)
  const dirty = editorData(tab)?.dirty === true
  const canClose = closable(model, tab)
  const close = () => model.run("tab.close", { tabId: tab.id })

  return (
    <Menu.Root positioning={{ placement: "right-start" }}>
      <Menu.ContextTrigger asChild>
        {/* `render` makes the context menu trigger the tab itself, with the tab's props */}
        <Dockable.Tab
          node={tab}

          data-dirty={dirty ? "" : undefined}
          css={{
            position: "relative",
            display: "flex",
            height: "34px",
            maxWidth: "240px",
            flexShrink: 0,
            cursor: "pointer",
            userSelect: "none",
            alignItems: "center",
            gap: "6px",
            padding: "0 4px 0 10px",
            borderInlineEnd: "1px solid #3c4656",
            fontSize: "13px",
            color: "#aab7ca",
            _hover: { backgroundColor: "#394454" },
            "&[data-selected]": {
              backgroundColor: "#1e2430",
              color: "#f4f7fb",
              boxShadow: "inset 0 -2px #60a5fa",
            },
            "&[data-dragging]": { opacity: 0.4 },
            "&:hover .close-icon, &[data-selected] .close-icon": { opacity: 1 },
            "&:hover .dirty-dot": { display: "none" },
            "&:hover .dirty-close": { display: "block" },
          }}
        >
          <TabIcon tab={tab} />
          <chakra.span css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tab.label}</chakra.span>
          {canClose ? (
            <chakra.button
              type="button"
              // the tab is the tab stop: Ctrl+Delete on it closes it from the keyboard
              tabIndex={-1}
              aria-label={`Close ${tab.label}`}
              data-testid="close-tab"
              css={{
                display: "grid",
                width: "20px",
                height: "20px",
                flexShrink: 0,
                placeItems: "center",
                borderRadius: "3px",
                _hover: { backgroundColor: "#4a5667" },
              }}
              // keeps the press from activating the tabset
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation() // a click on the tab would select it
                close()
              }}
            >
              {/* VS Code's convention: a dot while modified, the cross on hover */}
              {dirty ? (
                <chakra.span
                  data-testid="dirty-dot"
                  className="dirty-dot"
                  css={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d9e1ec" }}
                />
              ) : null}
              <StyledX
                aria-hidden="true"
                className={dirty ? "close-icon dirty-close" : "close-icon"}
                css={{ width: "14px", height: "14px", display: dirty ? "none" : undefined, opacity: dirty ? 1 : 0 }}
              />
            </chakra.button>
          ) : null}
        </Dockable.Tab>
      </Menu.ContextTrigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="close" disabled={!canClose} onClick={close}>
              Close
            </Menu.Item>
            <Menu.Item
              value="close-others"
              disabled={siblings.length < 2}
              onClick={() =>
                closeAll(
                  model,
                  siblings.filter((other) => other.id !== tab.id),
                )
              }
            >
              Close others
            </Menu.Item>
            <Menu.Item
              value="close-right"
              disabled={index === siblings.length - 1}
              onClick={() => closeAll(model, siblings.slice(index + 1))}
            >
              Close to the right
            </Menu.Item>
            <Menu.Item
              value="close-saved"
              onClick={() =>
                closeAll(
                  model,
                  siblings.filter((other) => editorData(other)?.dirty !== true),
                )
              }
            >
              Close saved
            </Menu.Item>
            <Menu.Separator />
            {/* moving a tab to its own tabset's edge splits it off into a new tabset */}
            <Menu.Item
              value="split-right"
              disabled={siblings.length < 2}
              onClick={() =>
                model.run("tab.move", {
                  tabId: tab.id,
                  to: tabset.id,
                  location: "end",
                })
              }
            >
              Split right
            </Menu.Item>
            <Menu.Item
              value="split-down"
              disabled={siblings.length < 2}
              onClick={() =>
                model.run("tab.move", {
                  tabId: tab.id,
                  to: tabset.id,
                  location: "bottom",
                })
              }
            >
              Split down
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export function WorkbenchTabSet({ node }: { node: TabsetNode<Types> }) {
  const { model } = useDockable<Types>()
  const { hiddenTabs } = useTabOverflow(node)
  const maximized = model.is("tabset-maximized", { tabsetId: node.id })

  return (
    <Dockable.TabSet
      node={node}
      css={{
        // backgroundColor: "#1e2430",

        border: "1px solid #3c4656",
        borderRadius: "4px",
        "&[data-active]": { borderColor: "#5c7190" },
      }}
    >
      <chakra.div css={{ display: "flex", minHeight: "34px", alignItems: "stretch", borderBottom: "1px solid #3c4656" }}>
        <Dockable.TabList<Types>
          aria-label={node.id === "panel" ? "Panel" : "Editors"}
          css={{
            display: "flex",
            minWidth: 0,
            flex: 1,
            alignItems: "end",
            overflow: "hidden",
            // backgroundColor: "#252c38"
          }}
        >
          {(tab) => <WorkbenchTab tab={tab} tabset={node} />}
        </Dockable.TabList>
        <chakra.div css={{ display: "flex", alignItems: "center", gap: "2px", paddingRight: "4px" }}>
          {/* the tabs that do not fit, one click away (rendered only while there are some) */}
          <Menu.Root onSelect={({ value }) => model.run("tab.select", { tabId: value })}>
            <Menu.Trigger asChild>
              <Dockable.TabOverflowTrigger
                aria-label={`${hiddenTabs.length} more tabs`}
                data-testid="overflow-select"
                css={{ height: "24px", padding: "0 8px", fontSize: "12px" }}
              >
                {`+${hiddenTabs.length}`}
              </Dockable.TabOverflowTrigger>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {hiddenTabs.map((tab) => (
                    <Menu.Item key={tab.id} value={tab.id}>
                      {tab.label}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <chakra.button
            type="button"
            aria-label={maximized ? "Restore" : "Maximize"}
            aria-pressed={maximized}
            onClick={() =>
              model.run("tabset.maximize", {
                tabsetId: node.id,
                value: !maximized,
              })
            }
            css={{
              display: "grid",
              width: "24px",
              height: "24px",
              flexShrink: 0,
              placeItems: "center",
              borderRadius: "3px",
              cursor: "pointer",
              // _hover: { backgroundColor: "#394454" },
            }}
          >
            {maximized ? (
              <Minimize2 aria-hidden="true" style={{ width: "14px", height: "14px" }} />
            ) : (
              <Maximize2 aria-hidden="true" style={{ width: "14px", height: "14px" }} />
            )}
          </chakra.button>
        </chakra.div>
      </chakra.div>
      {/* the content area renders nothing of its own: `render` adds the empty state */}
      <Dockable.TabSetContent
        render={
          <chakra.div>
            {node.children.length === 0 ? (
              <chakra.p
                css={{ display: "grid", height: "100%", placeItems: "center", padding: "16px", fontSize: "14px", color: "#aab7ca" }}
              >
                Open a file from the explorer.
              </chakra.p>
            ) : null}
          </chakra.div>
        }
      />
    </Dockable.TabSet>
  )
}
