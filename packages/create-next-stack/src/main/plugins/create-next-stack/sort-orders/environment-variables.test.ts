import { test } from "@jest/globals"
import endent from "endent"
import { plugins } from "../../../setup/setup"
import { environmentVariablesSortOrder } from "./environment-variables"

test("`environmentVariablesSortOrder` contains no duplicates", () => {
  const seenEnvironmentVariables = new Set<string>()
  for (const environmentVariable of environmentVariablesSortOrder) {
    if (seenEnvironmentVariables.has(environmentVariable)) {
      throw new Error(
        `Duplicate environment variable with name "${environmentVariable}" found in environment-variables.ts`
      )
    }
    seenEnvironmentVariables.add(environmentVariable)
  }
})

test("`environmentVariablesSortOrder` includes all plugins' environment variables", () => {
  const requiredEnvironmentVariables = plugins.flatMap((plugin) =>
    plugin.environmentVariables //
      ? Object.values(plugin.environmentVariables).map(
          (environmentVariable) => environmentVariable.name
        )
      : []
  )
  const actualEnvironmentVariables = new Set(environmentVariablesSortOrder)
  for (const requiredEnvironmentVariable of requiredEnvironmentVariables) {
    if (!actualEnvironmentVariables.has(requiredEnvironmentVariable)) {
      throw new Error(
        endent`
          Missing environment variable with name "${requiredEnvironmentVariable}" in environment-variables.ts
          environment-variables.ts can be found here:
            src/main/plugins/create-next-stack/sort-orders/environment-variables.ts
        `
      )
    }
  }
})
