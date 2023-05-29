import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { tenMinutes } from "../../helpers/timeout"

test(
  "testCssModulesOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=css-modules",
      ".",
    ])
  },
  tenMinutes
)
