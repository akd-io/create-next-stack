import execa from "execa"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testDefaultOptionsInteractive = async (
  createNextStackDir: string
): Promise<void> => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = ["--debug", "."]

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  const execaProcess = execa(pathToProdCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  logTestInfo("Sending 3 x \\n to accept default options.")
  setTimeout(() => {
    execaProcess.stdin?.write("\n")
    setTimeout(() => {
      execaProcess.stdin?.write("\n")
      setTimeout(() => {
        execaProcess.stdin?.write("\n")
      }, 1000)
    }, 1000)
  }, 1000)

  await execaProcess

  await checkFormattingLintingBuild(runDirectory)
}
