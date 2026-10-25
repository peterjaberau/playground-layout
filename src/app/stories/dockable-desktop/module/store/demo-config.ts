import * as panelPlugins from "../../demo/plugins"

export const panelRegistryMap = Object.fromEntries(
  Object.values(panelPlugins).map((plugin) => [plugin.name, plugin]),
)

export const panelRegistryDemo = {
}
