import { test } from "@jest/globals"
import endent from "endent"
import { plugins } from "../../../setup/setup"
import { scriptsSortOrder } from "./scripts"

test("`scriptsSortOrder` contains no duplicates", () => {
  const seenScripts = new Set<string>()
  for (const script of scriptsSortOrder) {
    if (seenScripts.has(script)) {
      throw new Error(
        `Duplicate script with name "${script}" found in scripts.ts`
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
  const actualScripts = new Set(scriptsSortOrder)
  for (const requiredScript of requiredScripts) {
    if (!actualScripts.has(requiredScript)) {
      throw new Error(
        endent`
          Missing script with name "${requiredScript}" in scripts.ts
          scripts.ts can be found here:
            src/main/plugins/create-next-stack/sort-orders/scripts.ts
        `
      )
    }
  }
})
