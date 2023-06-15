import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { fifteenMinutes } from "../../helpers/timeout"

test(
  "testStyledComponentsOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=styled-components",
      ".",
    ])
  },
  fifteenMinutes
)
