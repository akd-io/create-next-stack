import { describe, test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"
import { oneMinute } from "../helpers/timeout"

describe("testHelpAndVersionFlags", () => {
  test(
    "testHelpFlag",
    async () => {
      await testArgsWithoutFinalChecks(["--help"])
    },
    oneMinute
  )

  test(
    "testVersionFlag",
    async () => {
      await testArgsWithoutFinalChecks(["--version"])
    },
    oneMinute
  )
})
