"use client"
import { ClientOnly } from "@chakra-ui/react"
import { DocumentPane } from "./components/document-pane"

export default function Page() {
  return (
    <ClientOnly>
      <DocumentPane />
    </ClientOnly>
  )
}
