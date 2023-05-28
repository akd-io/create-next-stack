import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { defaultE2eTimeout } from "../../helpers/timeout"

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
  defaultE2eTimeout
)
