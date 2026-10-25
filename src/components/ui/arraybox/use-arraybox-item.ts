'use client'

import type { ItemState } from './arraybox.types'
import { createContext } from '@chakra-ui/react'


export const [ArrayboxItemProvider, useArrayboxItem] = createContext<ItemState>({
  name: "UseArrayboxItem",
  hookName: "useArrayboxItem",
  providerName: "<ArrayboxItemProvider />",
})
