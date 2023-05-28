import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test(
  "testCssModulesWithSassOnly",
  async () => {
    testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=css-modules-with-sass",
      ".",
    ])
  },
  10 * 60 * 1000
)
