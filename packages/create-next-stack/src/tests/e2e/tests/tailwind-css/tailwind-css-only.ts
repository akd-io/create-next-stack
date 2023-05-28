import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test("testTailwindCssOnly", async () => {
  testArgsWithFinalChecks([
    "--debug",
    "--package-manager=pnpm",
    "--styling=tailwind-css",
    ".",
  ])
})
