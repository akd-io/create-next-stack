import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { tenMinutes } from "../../helpers/timeout"

test(
  "testCssModulesWithSassOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=css-modules-with-sass",
      ".",
    ])
  },
  tenMinutes
)
