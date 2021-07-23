import console from "console"
import execa from "execa"
import { checkFormattingLintingBuild } from "../../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../../helpers/prepare-e2e-test"

export const testCssModulesOnlyNonInteractive = async (
  createNextStackDir: string
) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = [
    "--debug",
    "--package-manager=npm",
    "--styling=css-modules",
    ".",
  ]

  console.log(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  const execaProcess = execa(pathToProdCLI, args, {
    timeout: 10 * 60 * 1000, // 10 minutes
    cwd: runDirectory,
  })

  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  await execaProcess

  await checkFormattingLintingBuild("npm", runDirectory)
}
