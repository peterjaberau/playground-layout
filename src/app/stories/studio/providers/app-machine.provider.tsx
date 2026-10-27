"use client"
import { createActorContext } from "@xstate/react"
import { appMachine } from "../machines/appMachine"

export const AppMachineContext = createActorContext(appMachine)


export function AppMachineProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppMachineContext.Provider>
        {children}
    </AppMachineContext.Provider>
  )
}
