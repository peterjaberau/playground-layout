import { chakra } from "@chakra-ui/react"

const ToolPanelImpl = () => {
  return <chakra.div>ToolPanel</chakra.div>
}

export const ToolPanel = {
  component: ToolPanelImpl,
  title: "Tool Panel",
  name: "tool-panel",
}
