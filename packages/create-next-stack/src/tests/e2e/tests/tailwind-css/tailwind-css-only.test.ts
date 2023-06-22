import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { twentyMinutes } from "../../helpers/timeout"

test(
  "testTailwindCssOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      ".",
    ])
  },
  twentyMinutes
)
