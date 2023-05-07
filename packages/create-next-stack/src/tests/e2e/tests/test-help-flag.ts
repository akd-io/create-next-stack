import { runCommand } from "../../../main/helpers/run-command"
import { logTestMeta } from "../helpers/log-test-meta"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

export const testHelpFlag = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testHelpFlag.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = ["--help"]

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(1),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })
}
