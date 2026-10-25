import { chakra } from "@chakra-ui/react"

const PreviewOutputImpl = () => {
  return <chakra.div>PreviewOutput</chakra.div>
}

export const PreviewOutput = {
  component: PreviewOutputImpl,
  title: "Preview Output",
  name: "preview-output",
}
