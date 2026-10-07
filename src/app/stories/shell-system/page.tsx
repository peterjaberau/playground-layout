"use client"
import AppShell from "./module"

export default function Page() {
  return (
    <AppShell
      data={[]}
      config={{
        header: {},
        leftSidebar: {},
        leftPanel: {
          isExpanded: true,
          isPinned: true,
        },
        rightPanel: {
          isExpanded: true,
          isPinned: true,
        },
        rightSidebar: {},
        bottomPanel: {
          isExpanded: true,
          isPinned: true,
        },
        statusBar: {},
      }}
    />
  )
}
