import { prettyCommand } from "../../../main/helpers/pretty-command"
import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"
import { logTestInfo } from "../test-logging"

export const testVersionFlag = async (
  createNextStackDir: string
): Promise<void> => {
  logTestInfo(`Running test: ${testVersionFlag.name}`)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = ["--version"]

  logTestInfo(
    "Running command:",
    prettyCommand(pathToCLI, args),
    "in directory:",
    runDirectory
  )

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(1),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })
}
