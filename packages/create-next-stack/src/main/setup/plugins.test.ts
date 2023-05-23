import { test } from "@jest/globals"
import { plugins } from "./setup"

test("`plugins` contains no duplicates", () => {
  const seenPluginIDs = new Set<string>()
  for (const plugin of plugins) {
    if (seenPluginIDs.has(plugin.id)) {
      throw new Error(
        `Duplicate plugin with ID "${plugin.id}" found in setup.ts`
      )
    }
    seenPluginIDs.add(plugin.id)
  }
})
