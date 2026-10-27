"use client"

import { AppMachineContext } from "../providers/app-machine.provider"

export const useAppContext = () => {
  const filesRef = AppMachineContext.useSelector((s) => s.context.filesRef)
  const documentRef = AppMachineContext.useSelector((s) => s.context.documentRef)

  return {
    state: {},
    data: { filesRef, documentRef },
    actions: {},
  }
}
