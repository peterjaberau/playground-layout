"use client";

import { useState } from "react";
import { FileText, PenTool, Loader2, Plus, Trash2, Files } from "lucide-react";
import { useFilesContext } from "../hooks/useFilesContext";
import { Icon, Button, chakra } from "@chakra-ui/react";


function DocumentRow({ doc, active, onOpen }: any) {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <chakra.div
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: "md",
        px: 3,
        py: 2,
        fontSize: "sm",
        fontWeight: "medium",
        cursor: "pointer",
        color: active ? "var(--sidebar-accent-foreground)" : "var(--muted-foreground)",
        backgroundColor: active ? "var(--sidebar-accent)" : "transparent",
        "&:hover": {
          color: "var(--sidebar-accent-foreground)",
        },
      }}
      onClick={() => onOpen(doc.id)}
    >
      {active && (
        <chakra.span
          css={{
            position: "absolute",
            left: 0,
            top: "50%",
            height: "1.25rem",
            width: "0.125rem",
            transform: "translateY(-50%)",
            borderRadius: "0 0.25rem 0.25rem 0",
            backgroundColor: "var(--primary)",
          }}
        />
      )}
      <Icon>
        <FileText />
      </Icon>
      <chakra.span
        css={{
          minWidth: 0,
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {doc.name}
      </chakra.span>
    </chakra.div>
  )
}

export function AppSidebar() {
  const { state, data, actions } = useFilesContext();

  return (
    <chakra.aside
      css={{
        display: "flex",
        h: "full",
        w: "56",
        shrink: 0,
        flexDirection: "column",
        borderRight: "1px solid var(--sidebar-border)",
        backgroundColor: "var(--sidebar)",
      }}
    >
      <Button onClick={actions.open.list} size={"sm"} variant={"ghost"}>
        All documents
      </Button>
      <chakra.nav
        css={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 0.5,
          overflowY: "auto",
          p: 2,
        }}
      >
        {state.isLoading && (
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 3,
              py: 2,
              fontSize: "xs",
              color: "var(--muted-foreground)",
            }}
          >
            Loading…
          </chakra.div>
        )}
        {data.documents.map((doc: any) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
            active={doc.id === data.openId}
            onOpen={actions.open.document}
          />
        ))}
      </chakra.nav>
    </chakra.aside>
  )
}
