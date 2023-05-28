import { test } from "@jest/globals"
import { plugins } from "./setup"

test("`plugins` contains no duplicates", () => {
  const seenPluginIDs = new Set<string>()
  for (const plugin of plugins) {
    const { id } = plugin
    if (seenPluginIDs.has(id)) {
      throw new Error(`Duplicate plugin with ID "${id}" found in setup.ts`)
    }
    seenPluginIDs.add(id)
  }
})
