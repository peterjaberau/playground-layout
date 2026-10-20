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
          mode: "push",
        },
        rightPanel: {
          isExpanded: true,
          mode: "push",
        },
        rightSidebar: {},
        bottomPanel: {
          isExpanded: true,
          mode: "push",
        },
        statusBar: {},
      }}
    />
  )
}
