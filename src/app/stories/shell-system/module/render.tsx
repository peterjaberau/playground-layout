"use client"

import { AppShellProvider, ThemeProvider } from "./providers"
import { AppShell } from "./components"

const Render = (props: any) => {
  return (
    <>
      <AppShellProvider {...props}>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </AppShellProvider>
    </>
  )
}

export default Render
