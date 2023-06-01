import { test } from "@jest/globals"
import { plugins } from "../../../setup/setup"
import { technologiesSortOrder } from "./technologies"

test("`technologiesSortOrder` contains no duplicates", () => {
  const seenTechnologies = new Set<string>()
  for (const technology of technologiesSortOrder) {
    if (seenTechnologies.has(technology)) {
      throw new Error(
        `Duplicate technology with name "${technology}" found in technologies.ts`
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
  for (const requiredTechnologyID of requiredTechnologyIDs) {
    if (!actualTechnologyIDs.has(requiredTechnologyID)) {
      throw new Error(
        `Missing technology with ID "${requiredTechnologyID}" in technologies.ts`
      )
    }
  }
})
