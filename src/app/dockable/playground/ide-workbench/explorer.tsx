"use client"

import { type Model, useModelState } from "../components"
import { ChevronRight, FileCode2, FileJson, FileText, Hash, RotateCcw } from "lucide-react"
import { useState } from "react"
import { FILE_PATHS, fileName, folderOf } from "./files"
import { chakra } from "@chakra-ui/react"
import { activePath, dirtyPaths, type Types } from "./workspace"

// The file tree. It is the content of the start border's "Explorer" tab, and opens files through
// the callback it is given (the example turns that into the `tab.add` / `tab.select` commands).

/** A file type: its icon, and the tone that colours it. */
type FileType = [typeof FileCode2, "orange" | "green" | "purple" | "blue"]

/** A file icon, coloured by type through a palette (so every theme recolours it). */
export function FileIcon({ path, className }: { path: string; className?: string }) {
  const [Icon, tone]: FileType = path.endsWith(".json")
    ? [FileJson, "orange"]
    : path.endsWith(".md")
      ? [FileText, "green"]
      : path.endsWith(".css")
        ? [Hash, "purple"]
        : [FileCode2, "blue"]
  return (
    <Icon
      aria-hidden="true"
      className={className}
      style={{
        width: 14,
        height: 14,
        flexShrink: 0,
        color: { orange: "#fbbf24", green: "#4ade80", purple: "#c084fc", blue: "#60a5fa" }[tone],
      }}
    />
  )
}

export function Explorer({
  model,
  onOpen,
  onResetLayout,
}: {
  model: Model<Types>
  onOpen: (path: string) => void
  onResetLayout: () => void
}) {
  const dirty = useModelState(() => dirtyPaths(model), { model })
  const active = useModelState(() => activePath(model), { model })
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set())
  const folders = [...new Set(FILE_PATHS.map(folderOf))]

  const toggle = (folder: string) =>
    setCollapsed((current) => {
      const next = new Set(current)
      if (next.has(folder)) next.delete(folder)
      else next.add(folder)
      return next
    })

  return (
    <chakra.nav aria-label="Explorer" css={{ display: "flex", height: "100%", minWidth: 0, flexDirection: "column" }}>
      <chakra.div
        css={{
          display: "flex",
          height: "34px",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4px 0 12px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "#aab7ca",
        }}
      >
        Explorer
        <chakra.button
          type="button"
          aria-label="Reset the saved layout"
          title="Reset the saved layout"
          onClick={onResetLayout}
          css={{
            display: "grid",
            width: "24px",
            height: "24px",
            placeItems: "center",
            borderRadius: "3px",
            _hover: { backgroundColor: "#394454" },
          }}
        >
          <RotateCcw aria-hidden="true" style={{ width: "14px", height: "14px" }} />
        </chakra.button>
      </chakra.div>
      <chakra.ul css={{ minHeight: 0, flex: 1, overflow: "auto", paddingBottom: "8px", listStyle: "none" }}>
        {folders.map((folder) => {
          const files = FILE_PATHS.filter((path) => folderOf(path) === folder)
          const open = !collapsed.has(folder)
          return (
            <chakra.li key={folder || "/"}>
              {folder ? (
                <chakra.button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggle(folder)}
                  css={{
                    display: "flex",
                    height: "24px",
                    width: "100%",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0 8px",
                    textAlign: "start",
                    fontSize: "13px",
                    _hover: { backgroundColor: "#394454" },
                  }}
                >
                  <ChevronRight
                    aria-hidden="true"
                    style={{ width: 14, height: 14, flexShrink: 0, transform: open ? "rotate(90deg)" : undefined }}
                  />
                  {folder}
                </chakra.button>
              ) : null}
              {open ? (
                <chakra.ul>
                  {files.map((path) => (
                    <chakra.li key={path}>
                      <chakra.button
                        type="button"
                        data-testid="explorer-file"
                        aria-current={path === active ? "true" : undefined}
                        onClick={() => onOpen(path)}
                        css={{
                          display: "flex",
                          height: "24px",
                          width: "100%",
                          alignItems: "center",
                          gap: "6px",
                          paddingInlineStart: folder ? "28px" : "12px",
                          paddingInlineEnd: "8px",
                          fontSize: "13px",
                          textAlign: "start",
                          _hover: { backgroundColor: "#394454" },
                          "&[aria-current]": {
                            backgroundColor: "#394454",
                            color: "white",
                          },
                        }}
                      >
                        <FileIcon path={path} />
                        <chakra.span css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {fileName(path)}
                        </chakra.span>
                        {dirty.has(path) ? (
                          <chakra.span
                            role="img"
                            aria-label="modified"
                            css={{ marginInlineStart: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#aab7ca" }}
                          />
                        ) : null}
                      </chakra.button>
                    </chakra.li>
                  ))}
                </chakra.ul>
              ) : null}
            </chakra.li>
          )
        })}
      </chakra.ul>
    </chakra.nav>
  )
}
