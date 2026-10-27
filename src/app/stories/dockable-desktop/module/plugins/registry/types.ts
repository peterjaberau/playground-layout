export interface Plugin {
  id: string
  name: string
  version?: string
  onRegister?: () => void
}

export interface PluginRegistry {
  register(plugin: Plugin): void
  getPlugins(): Plugin[]
}