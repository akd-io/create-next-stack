import console from "console"
import execa from "execa"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"

export const testDefaultOptionsInteractive = async (
  createNextStackDir: string
) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = ["--debug", "."]

  console.log(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  const execaProcess = execa(pathToProdCLI, args, {
    timeout: 10 * 60 * 1000, // 10 minutes
    cwd: runDirectory,
  })

  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  console.log("Sending \\n to accept default options.")
  execaProcess.stdin?.write("\n") // Press

  await execaProcess

  await checkFormattingLintingBuild("yarn")
}
