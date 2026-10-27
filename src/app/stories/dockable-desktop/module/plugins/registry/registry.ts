import { PluginRegistry, Plugin } from "./types"

function createPluginRegistry(): PluginRegistry {
  const plugins: Plugin[] = []

  return {
    register(plugin: Plugin): void {
      // Check for duplicate plugin IDs
      const existing = plugins.find((p) => p.id === plugin.id)
      if (existing) {
        console.warn(`Plugin with ID "${plugin.id}" is already registered. Skipping.`)
        return
      }

      plugins.push(plugin)

      if (plugin.onRegister) {
        try {
          plugin.onRegister()
        } catch (error) {
          console.error(`Error in onRegister hook for plugin "${plugin.id}":`, error)
        }
      }
    },

    getPlugins(): Plugin[] {
      return [...plugins]
    },
  }
}

/**
 * The global plugin registry singleton
 */
export const pluginRegistry = createPluginRegistry()

/**
 * Convenience function to register a plugin
 */
export function registerPlugin(plugin: Plugin): void {
  pluginRegistry.register(plugin)
}
