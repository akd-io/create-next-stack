import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { twentyMinutes } from "../../helpers/timeout"

test(
  "testTailwindCssWithMantine",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      "--mantine",
      ".",
    ])
  },
  twentyMinutes,
)
