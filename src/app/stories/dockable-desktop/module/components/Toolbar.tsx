import { chakra } from "@chakra-ui/react"

const ToolbarImpl = () => {
  return <chakra.div>Toolbar</chakra.div>
}

export const Toolbar = {
  component: ToolbarImpl,
  title: "Toolbar",
  name: "toolbar",
}
