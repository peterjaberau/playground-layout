"use client";

import { useState } from "react";
import { Loader2, Save, AlertCircle, Hand } from "lucide-react";
import { useDocumentContext } from "../hooks/useDocumentContext";
import { useFilesContext } from "..//hooks/useFilesContext"
import { chakra } from "@chakra-ui/react";

function FilesView() {
  const { state, data, actions } = useFilesContext();
  return (
    <chakra.div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "24px",
        textAlign: "center",
        flex: 1,
      }}
      >
      <chakra.p
        css={{
          fontSize: "13px",
          color: "var(--muted-foreground)",
        }}
        >
        {state.isLoading
          ? "Loading documents…"
          : data.documents.length === 0
            ? "No documents yet."
            : "Pick a document on the left, or start a new one."}
      </chakra.p>
    </chakra.div>
  );
}

export function DocumentPane() {
  const { state, data, actions } = useDocumentContext();

  return (
    <chakra.div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
        flex: 1,
        mx: "auto",
      }}
    >
      <chakra.p
      css={{
        fontSize: "13px",
        color: "var(--muted-foreground)",
      }}
      >{data.document.content}</chakra.p>

    </chakra.div>
  )
}
