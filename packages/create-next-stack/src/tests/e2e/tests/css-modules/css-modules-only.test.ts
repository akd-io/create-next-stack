import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test(
  "testCssModulesOnly",
  async () => {
    testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=css-modules",
      ".",
    ])
  },
  10 * 60 * 1000
)
