import { test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"

test("testHelpFlag", async () => {
  testArgsWithoutFinalChecks(["--help"])
})

test("testVersionFlag", async () => {
  testArgsWithoutFinalChecks(["--version"])
})
