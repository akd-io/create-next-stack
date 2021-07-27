import execa from "execa"
import { checkFormattingLintingBuild } from "../../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../../helpers/test-logging"

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

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  await execa(pathToProdCLI, args, {
    timeout: 10 * 60 * 1000, // 10 minutes
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await checkFormattingLintingBuild("npm", runDirectory)
}
