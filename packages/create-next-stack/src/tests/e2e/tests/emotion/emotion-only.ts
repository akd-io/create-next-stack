import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test("testEmotionOnly", async () => {
  testArgsWithFinalChecks([
    "--debug",
    "--package-manager=pnpm",
    "--styling=emotion",
    ".",
  ])
})
