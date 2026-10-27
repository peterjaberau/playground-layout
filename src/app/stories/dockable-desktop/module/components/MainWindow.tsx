import { chakra } from "@chakra-ui/react"

const MainWindowImpl = () => {
  return <chakra.div>Main Window</chakra.div>
}

export const MainWindow = {
  component: MainWindowImpl,
  title: "Main Window",
  name: "main-window",
}
