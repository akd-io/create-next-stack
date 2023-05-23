import { test } from "@jest/globals"
import { plugins } from "../../../setup/setup"
import { technologiesSortOrder } from "./technologies"

test("`technologiesSortOrder` contains no duplicates", () => {
  const seenTechnologies = new Set<string>()
  for (const technology of technologiesSortOrder) {
    if (seenTechnologies.has(technology)) {
      throw new Error(
        `Duplicate technology with name "${technology}" found in sort-order.ts`
      )
    }
    seenTechnologies.add(technology)
  }
})

test("`technologiesSortOrder` includes all plugins' technologies", () => {
  const requiredTechnologyIDs = plugins.flatMap((plugin) =>
    plugin.technologies //
      ? Object.values(plugin.technologies).map((technology) => technology.id)
      : []
  )
  const actualTechnologyIDs = new Set(technologiesSortOrder)
  for (const requiredTechnology of requiredTechnologyIDs) {
    if (!actualTechnologyIDs.has(requiredTechnology)) {
      throw new Error(
        `Missing technology with name "${requiredTechnology}" in sort-order.ts`
      )
    }
  }
})
