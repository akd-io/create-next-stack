import console from "console"
import execa from "execa"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

export const testDefaultOptionsInteractive = async () => {
  const { pathToProdCLI } = await prepareE2eTest()

  console.log(`Running command: ${pathToProdCLI} --debug .`)
  const execaProcess = execa(pathToProdCLI, ["--debug", "."], {
    timeout: 10 * 60 * 1000,
  }) // 10 minutes
  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  console.log("Sending \\n to accept default options.")
  execaProcess.stdin?.write("\n") // Press

  await execaProcess

  await checkFormattingLintingBuild()
}
