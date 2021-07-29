import execa from "execa"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testDefaultOptionsInteractive = async (
  createNextStackDir: string
) => {
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

  logTestInfo("Sending \\n to accept default options.")
  execaProcess.stdin?.write("\n")

  await execaProcess

  await checkFormattingLintingBuild(runDirectory)
}
