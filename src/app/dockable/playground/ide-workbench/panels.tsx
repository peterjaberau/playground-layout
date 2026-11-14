"use client"

import { type TabNode, useDockable } from "../components"
import { CircleAlert, TriangleAlert } from "lucide-react"
import { type KeyboardEvent, useEffect, useRef, useState } from "react"
import { FILE_PATHS, PROBLEMS } from "./files"
import { chakra } from "@chakra-ui/react"
import type { EditorData, Types, Workspace } from "./workspace"

// The content of each kind of tab. Panels are never remounted when their tab moves, so the
// editor keeps its text, caret and scroll through any drag.

/**
 * A plain-text editor. It reports "modified" to its TAB: the dirty flag goes into the tab's
 * `data` through the `tab.set-data` command, and the tab reads it back (`data-dirty`).
 * The text itself stays in the workspace, outside the model.
 */
export function EditorPanel({
  tab,
  workspace,
}: {
  // an editor tab: `tab.data` is typed as the editor's data, no cast
  tab: TabNode<"editor", EditorData>
  workspace: Workspace
}) {
  const { model } = useDockable<Types>()
  const { id, data } = tab
  const { path } = data
  const [text, setText] = useState(() => workspace.read(path))
  const [, setSaves] = useState(0)
  const dirty = workspace.isDirty(path)

  useEffect(() => {
    if (Boolean(data.dirty) !== dirty) {
      // a patch: the rest of the data (the path) stays
      model.run("tab.set-data", { tabId: id, data: { dirty } })
    }
  }, [model, id, data, dirty])

  const save = () => {
    workspace.save(path)
    setSaves((n) => n + 1)
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault()
      save()
    }
  }
  const lines = text.split("\n").length

  return (
    <chakra.div css={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <chakra.div
        css={{
          display: "flex",
          height: "28px",
          flexShrink: 0,
          alignItems: "center",
          gap: "4px",
          borderBottom: "1px solid #3c4656",
          padding: "0 4px 0 12px",
          fontSize: "12px",
          color: "#aab7ca",
        }}
      >
        {path.split("/").map((part, index, parts) => (
          <chakra.span key={part} css={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {index > 0 ? <chakra.span aria-hidden="true">›</chakra.span> : null}
            <chakra.span css={{ color: index === parts.length - 1 ? "#f4f7fb" : undefined }}>{part}</chakra.span>
          </chakra.span>
        ))}
        <chakra.button
          type="button"
          onClick={save}
          disabled={!dirty}
          css={{
            marginInlineStart: "auto",
            padding: "0 8px",
            borderRadius: "3px",
            _hover: { backgroundColor: "#394454" },
            _disabled: { opacity: 0.5 },
          }}
        >
          {dirty ? "Save" : "Saved"}
        </chakra.button>
      </chakra.div>
      <chakra.div
        css={{ display: "flex", minHeight: 0, flex: 1, overflow: "auto", fontFamily: "monospace", fontSize: "13px", lineHeight: "20px" }}
      >
        <chakra.pre
          aria-hidden="true"
          css={{
            position: "sticky",
            insetInlineStart: 0,
            margin: 0,
            flexShrink: 0,
            // backgroundColor: "#1e2430",
            padding: "8px 12px 8px 16px",
            textAlign: "end",
            color: "#78879b",
            userSelect: "none",
          }}
        >
          {Array.from({ length: lines }, (_, i) => i + 1).join("\n")}
        </chakra.pre>
        <chakra.textarea
          aria-label={`Contents of ${path}`}
          data-testid="editor"
          value={text}
          wrap="off"
          spellCheck={false}
          onChange={(event) => {
            setText(event.target.value)
            workspace.write(path, event.target.value)
          }}
          onKeyDown={onKeyDown}
          css={{
            minHeight: "100%",
            minWidth: 0,
            flex: 1,
            resize: "none",
            backgroundColor: "transparent",
            padding: "8px 16px 8px 0",
            whiteSpace: "pre",
            outline: "none",
            fieldSizing: "content",
          }}
        />
      </chakra.div>
    </chakra.div>
  )
}

/** A small shell: enough commands to feel like one. */
export function TerminalPanel({ workspace }: { workspace: Workspace }) {
  const [lines, setLines] = useState<string[]>([
    "Welcome to the workbench terminal. Type `help`.",
  ])
  const [input, setInput] = useState("")
  const end = useRef<HTMLDivElement | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when a line is added
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" })
  }, [lines])

  const run = (command: string) => {
    const [name, ...args] = command.trim().split(/\s+/)
    const out: Record<string, () => string[]> = {
      help: () => ["commands: ls, cat <file>, git status, clear"],
      ls: () => FILE_PATHS,
      cat: () => workspace.read(args[0] ?? "").split("\n"),
      git: () => {
        const modified = FILE_PATHS.filter(workspace.isDirty)
        return modified.length > 0 ? modified.map((path) => `  modified:   ${path}`) : ["nothing to commit, working tree clean"]
      },
    }
    if (name === "clear") {
      setLines([])
      return
    }
    const result = name ? (out[name]?.() ?? [`${name}: command not found`]) : []
    setLines((current) => [...current, `$ ${command}`, ...result].slice(-500))
  }

  return (
    <chakra.div
      css={{
        display: "flex",
        minHeight: "100%",
        flexDirection: "column",
        padding: "8px",
        fontFamily: "monospace",
        fontSize: "12px",
        lineHeight: "20px",
      }}
    >
      {lines.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: an append-only log
        <chakra.div key={index} css={{ whiteSpace: "pre-wrap" }}>
          {line}
        </chakra.div>
      ))}
      <chakra.form
        css={{ display: "flex", alignItems: "center", gap: "8px" }}
        onSubmit={(event) => {
          event.preventDefault()
          run(input)
          setInput("")
        }}
      >
        <chakra.span aria-hidden="true" css={{ color: "#aab7ca" }}>
          ~/counter-app $
        </chakra.span>
        <chakra.input
          aria-label="Terminal command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          css={{ minWidth: 0, flex: 1, backgroundColor: "transparent", outline: "none" }}
        />
      </chakra.form>
      <chakra.div ref={end} />
    </chakra.div>
  )
}

/** The linter's findings; clicking one opens its file. */
export function ProblemsPanel({ onOpen }: { onOpen: (path: string) => void }) {
  return (
    <chakra.ul css={{ padding: "4px 0", fontSize: "13px", listStyle: "none" }}>
      {PROBLEMS.map((problem) => {
        const Icon = problem.severity === "error" ? CircleAlert : TriangleAlert
        return (
          <chakra.li key={`${problem.path}:${problem.line}`}>
            <chakra.button
              type="button"
              onClick={() => onOpen(problem.path)}
              css={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                textAlign: "start",
                _hover: { backgroundColor: "#394454" },
              }}
            >
              <Icon
                aria-label={problem.severity}
                style={{ width: 14, height: 14, flexShrink: 0, color: problem.severity === "error" ? "#f87171" : "#fbbf24" }}
              />
              <chakra.span css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{problem.message}</chakra.span>
              <chakra.span css={{ marginInlineStart: "auto", flexShrink: 0, fontSize: "12px", color: "#aab7ca" }}>
                {`${problem.path}:${problem.line}`}
              </chakra.span>
            </chakra.button>
          </chakra.li>
        )
      })}
    </chakra.ul>
  )
}
