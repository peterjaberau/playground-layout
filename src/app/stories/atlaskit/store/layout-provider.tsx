"use client"

import { createActorContext } from "@xstate/react"
import { layoutMachine } from "./layout-machine"

export const LayoutContext = createActorContext(layoutMachine)

export const LayoutProvider = ({ children, input = {} }: any) => {
  return <LayoutContext.Provider options={{ input: { theme: "light" } }}>{children}</LayoutContext.Provider>
}
