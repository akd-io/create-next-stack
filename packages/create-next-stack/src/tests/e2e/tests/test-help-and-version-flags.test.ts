import { describe, test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"

describe("testHelpAndVersionFlags", () => {
  test("testHelpFlag", async () => {
    await testArgsWithoutFinalChecks(["--help"])
  })

  test("testVersionFlag", async () => {
    await testArgsWithoutFinalChecks(["--version"])
  })
})
