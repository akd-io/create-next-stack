import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"

test("testStyledComponentsOnly", async () => {
  testArgsWithFinalChecks([
    "--debug",
    "--package-manager=pnpm",
    "--styling=styled-components",
    ".",
  ])
})
