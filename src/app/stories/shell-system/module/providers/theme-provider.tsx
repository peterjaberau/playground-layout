import {
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
  useSlotRecipe,
  chakra,
  Container,
} from "@chakra-ui/react"
import { ReactNode } from "react"
const themeConfig: any = defineConfig({
  ...defaultConfig,
} as any)
const theme = createSystem(themeConfig)

export const ThemeProvider = (props: { children: ReactNode }) => {
  return <ChakraProvider value={theme}>{props.children}</ChakraProvider>
}
