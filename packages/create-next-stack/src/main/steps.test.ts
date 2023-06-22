import { test } from "@jest/globals"
import { nonNull } from "./helpers/non-null"
import { plugins } from "./setup/setup"
import { stepsOrder } from "./steps"

test("`steps` contains no duplicates", () => {
  const seenSteps = new Set<string>()
  for (const stepId of stepsOrder) {
    if (seenSteps.has(stepId)) {
      throw new Error(`Duplicate step with ID "${stepId}" found in steps.ts`)
    }
    seenSteps.add(stepId)
  }
})

test("`steps` includes all plugins' steps", () => {
  const requiredStepIDs = plugins
    .flatMap((plugin) => plugin.steps)
    .filter(nonNull)
    .map((step) => step.id)
  const actualStepIDs = new Set(stepsOrder)
  for (const requiredStepID of requiredStepIDs) {
    if (!actualStepIDs.has(requiredStepID)) {
      throw new Error(`Missing step with ID "${requiredStepID}" in steps.ts`)
    }
  }
})
