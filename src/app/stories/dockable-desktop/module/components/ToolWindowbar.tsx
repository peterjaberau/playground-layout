import { chakra } from "@chakra-ui/react"

const ToolWindowbarImpl = () => {
  return <chakra.div>ToolWindowBar</chakra.div>
}

export const ToolWindowbar = {
  component: ToolWindowbarImpl,
  title: "Tool Window Bar",
  name: "tool-window-bar",
}
