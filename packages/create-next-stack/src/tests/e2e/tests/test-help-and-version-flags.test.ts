import { describe, test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"

describe("testHelpAndVersionFlags", () => {
  test("testHelpFlag", async () => {
    testArgsWithoutFinalChecks(["--help"])
  })

  test("testVersionFlag", async () => {
    testArgsWithoutFinalChecks(["--version"])
  })
})
