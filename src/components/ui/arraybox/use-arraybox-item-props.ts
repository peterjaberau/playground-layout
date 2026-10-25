"use client"

import type { ItemProps } from "./arraybox.types"
import { createContext } from "@chakra-ui/react"


export const [ArrayboxItemPropsProvider, useArrayboxItemProps] = createContext<ItemProps>({
  name: "UseArrayboxItemProps",
  hookName: "useArrayboxItemProps",
  providerName: "<ArrayboxItemPropsProvider />",
})
