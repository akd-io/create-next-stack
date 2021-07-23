import console from "console"
import execa from "execa"
import { checkFormattingLintingBuild } from "../../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../../helpers/prepare-e2e-test"

export const testEmotionOnlyNonInteractive = async (
  createNextStackDir: string
) => {
  const { pathToProdCLI } = await prepareE2eTest(createNextStackDir)

  console.log(
    `Running command: ${pathToProdCLI} --debug --package-manager=yarn --styling=emotion .`
  )
  const execaProcess = execa(
    pathToProdCLI,
    ["--debug", "--package-manager=yarn", "--styling=emotion", "."],
    {
      timeout: 10 * 60 * 1000, // 10 minutes
    }
  )
  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  await execaProcess

  await checkFormattingLintingBuild("yarn")
}
