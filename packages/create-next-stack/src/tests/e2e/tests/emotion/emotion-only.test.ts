import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { tenMinutes } from "../../helpers/timeout"

test(
  "testEmotionOnly",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--styling=emotion",
      ".",
    ])
  },
  tenMinutes
)
