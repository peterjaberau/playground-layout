'use client'

import type { Props } from './arraybox.types'
import { createContext } from '@chakra-ui/react'



export const [ArrayboxPropsProvider, useArrayboxProps] = createContext<Props>({
  name: "UseArrayboxProps",
  hookName: "useArrayboxProps",
  providerName: "<ArrayboxPropsProvider />",
})
