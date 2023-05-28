import { test } from "@jest/globals"
import { plugins } from "./setup/setup"
import { steps } from "./steps"

test("`steps` contains no duplicates", () => {
  const seenSteps = new Set<string>()
  for (const step of steps) {
    const { id } = step
    if (seenSteps.has(id)) {
      throw new Error(`Duplicate step with ID "${id}" found in steps.ts`)
    }
    seenSteps.add(id)
  }
})

test("`steps` includes all plugins' steps", () => {
  const requiredStepIDs = plugins.flatMap((plugin) =>
    plugin.steps //
      ? Object.values(plugin.steps).map((step) => step.id)
      : []
  )
  const actualStepIDs = new Set(steps.map((step) => step.id))
  for (const requiredStepID of requiredStepIDs) {
    if (!actualStepIDs.has(requiredStepID)) {
      throw new Error(`Missing step with ID "${requiredStepID}" in steps.ts`)
    }
  }
})
