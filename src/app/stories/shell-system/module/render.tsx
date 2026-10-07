"use client"

import { AppShellProvider } from "./providers"
import { ThemeProvider } from "./components/theme"
import AppShell from "./components"

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
