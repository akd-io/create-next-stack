import { test } from "@jest/globals"
import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

test("testVersionFlag", async () => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  const args = ["--version"]

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(1),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })
})
