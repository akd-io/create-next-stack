import execa from "execa"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../helpers/test-logging"

export const testDefaultOptionsInteractive = async (
  createNextStackDir: string
) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = ["--debug", "."]

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  const execaProcess = execa(pathToProdCLI, args, {
    timeout: 10 * 60 * 1000, // 10 minutes
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  logTestInfo("Sending \\n to accept default options.")
  execaProcess.stdin?.write("\n") // Press

  await execaProcess

  await checkFormattingLintingBuild("yarn", runDirectory)
}
