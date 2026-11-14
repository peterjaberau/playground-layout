"use client"

import {
  createModel,
  Dockable,
  type LayoutJson,
  type RowNode,
  type RowSplitterProps,
  type TabOf,
  type TabsetNode,
} from "@fragiola/dockable-react"
import { useState } from "react"
import "./dockable.css"

// The layout with no CSS: no primitive gets a class, and each renders a plain `div` with only
// structural inline styles (flex sizing, `position`, geometry, `display: none`). What you see is
// the browser's default rendering of that markup.

type Types = { tabs: { card: undefined } }

const json: LayoutJson<Types> = {
  version: 1,
  root: {
    type: "row",
    children: [
      {
        type: "tabset",
        weight: 60,
        children: [
          { component: "card", label: "Welcome" },
          { component: "card", label: "Notes" },
        ],
      },
      {
        type: "row",
        weight: 40,
        children: [
          {
            type: "tabset",
            children: [{ component: "card", label: "Inspector" }],
          },
          {
            type: "tabset",
            children: [{ component: "card", label: "Output" }],
          },
        ],
      },
    ],
  },
}

export default function UnstyledExample() {
  const [model] = useState(() => createModel<Types>(json))
  return (
    <div className={styles.page}>
      {/* The stage's theme sets an inherited font, colour and background: `all: initial` on
                this wrapper cuts that inheritance, so the layout below shows what the browser
                gives you with no CSS at all (black serif text on the canvas colour). It is the
                example's own element, not a Dockable primitive; an app would not need it. */}
      <div
        data-testid="unstyled-frame"
        style={{
          all: "initial",
          display: "flex",
          flex: 1,
          minHeight: 0,
          background: "Canvas",
          color: "CanvasText",
        }}
      >
        {/* Root is `position: relative`; it only needs a size to lay out in. */}
        <Dockable.Root model={model} className="layout">
          <Dockable.Row renderSplitter={renderSplitter}>{renderNode}</Dockable.Row>
          <Dockable.Panels>{(tab) => <Dockable.Panel node={tab}>{content(tab)}</Dockable.Panel>}</Dockable.Panels>
          <Dockable.DropIndicator />
        </Dockable.Root>
      </div>
    </div>
  )
}

function renderNode(node: TabsetNode<Types> | RowNode<Types>) {
  if (node.type === "row") {
    return (
      <Dockable.Row node={node} renderSplitter={renderSplitter}>
        {renderNode}
      </Dockable.Row>
    )
  }
  return <TabSet node={node} />
}

/** A splitter has no name of its own: `Row` inserts it, so `renderSplitter` names it. */
function renderSplitter(props: RowSplitterProps<Types>) {
  return <Dockable.Splitter {...props} aria-label="Resize" />
}

function TabSet({ node }: { node: TabsetNode<Types> }) {
  return (
    <Dockable.TabSet node={node}>
      <div>
        <Dockable.TabList<Types> aria-label="Tabs">
          {(tab) => (
            <Dockable.Tab node={tab}>
              <span>{tab.label}</span>
            </Dockable.Tab>
          )}
        </Dockable.TabList>
      </div>
      <Dockable.TabSetContent />
    </Dockable.TabSet>
  )
}

/** Unstyled content too: a panel renders whatever you give it. */
function Content({ tab }: { tab: TabOf<Types> }) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>{tab.label}</h2>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        {`Count: ${count}`}
      </button>
    </div>
  )
}
