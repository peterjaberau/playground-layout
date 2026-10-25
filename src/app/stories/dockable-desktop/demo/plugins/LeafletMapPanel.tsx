import { chakra } from "@chakra-ui/react"

const LeafletMapPanelImpl = () => {
  return <chakra.div>LeafletMapPanel</chakra.div>
}

export const LeafletMapPanel = {
  component: LeafletMapPanelImpl,
  title: "Leaflet Map Panel",
  name: "leaflet-map-panel",
}
