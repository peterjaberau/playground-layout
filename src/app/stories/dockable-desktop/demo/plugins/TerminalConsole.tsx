import { chakra } from "@chakra-ui/react"

const TerminalConsoleImpl = () => {
  return <chakra.div>TerminalConsole</chakra.div>
}

export const TerminalConsole = {
  component: TerminalConsoleImpl,
  title: "Terminal Console",
  name: "terminal-console",
}
