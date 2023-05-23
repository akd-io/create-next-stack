import { test } from "@jest/globals"
import { plugins } from "../../../setup/setup"
import { scriptsSortOrder } from "./sort-order"

test("`scriptsSortOrder` contains no duplicates", () => {
  const seenScripts = new Set<string>()
  for (const script of scriptsSortOrder) {
    if (seenScripts.has(script)) {
      throw new Error(
        `Duplicate script with name "${script}" found in sort-order.ts`
      )
    }
    seenScripts.add(script)
  }
})

test("`scriptsSortOrder` includes all plugins' scripts", () => {
  const requiredScripts = plugins.flatMap((plugin) =>
    plugin.scripts //
      ? Object.values(plugin.scripts).map((script) => script.name)
      : []
  )
  const actualScriptIDs = new Set(scriptsSortOrder)
  for (const requiredScript of requiredScripts) {
    if (!actualScriptIDs.has(requiredScript)) {
      throw new Error(
        `Missing script with name "${requiredScript}" in sort-order.ts`
      )
    }
  }
})
