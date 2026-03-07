import { testArgsWithoutFinalChecks } from "../helpers/test-args.ts"
import { oneMinute } from "../helpers/timeout.ts"

describe("testHelpAndVersionFlags", () => {
  test(
    "testHelpFlag",
    async () => {
      await testArgsWithoutFinalChecks(["--help"])
    },
    oneMinute,
  )

  test(
    "testVersionFlag",
    async () => {
      await testArgsWithoutFinalChecks(["--version"])
    },
    oneMinute,
  )
})
