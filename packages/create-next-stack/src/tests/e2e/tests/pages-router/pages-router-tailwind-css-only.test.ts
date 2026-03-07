import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { twentyMinutes } from "../../helpers/timeout"

test(
  "testPagesRouterTailwindCssOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--router=pages",
      "--package-manager=pnpm",
      "--styling=tailwind-css",
      ".",
    ])
  },
  twentyMinutes,
)
