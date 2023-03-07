import { prettyCommand } from "../../../main/helpers/pretty-command"
import { runCommand } from "../../../main/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"
import { logTestInfo } from "../test-logging"

export const testInvalidInputs = async (
  createNextStackDir: string
): Promise<void> => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const argsArrays = {
    invalidName: [
      "INVALID-NAME",
      "--package-manager=npm",
      "--styling=css-modules",
    ],
    noStyling: ["--package-manager=npm"],
    noPackageManager: ["--styling=css-modules"],
    preCommitHookRequiresPrettier: [
      "--package-manager=npm",
      "--styling=css-modules",
      "--formatting-pre-commit-hook",
    ],
    chakraWithoutEmotion: [
      "--package-manager=npm",
      "--styling=css-modules",
      "--chakra",
      "--framer-motion",
    ],
    chakraWithoutFramerMotion: [
      "--package-manager=npm",
      "--styling=emotion",
      "--chakra",
    ],
    materialUiWithoutEmotion: [
      "--package-manager=npm",
      "--styling=css-modules",
      "--material-ui",
    ],
  }

  for (const args of Object.values(argsArrays)) {
    logTestInfo("Running command:", prettyCommand(pathToProdCLI, args))

    let didThrowError = false
    await runCommand(pathToProdCLI, args, {
      timeout: minutesToMilliseconds(1),
      cwd: runDirectory,
      stdout: "inherit",
      stderr: "ignore",
    }).catch(() => {
      didThrowError = true
    })

    if (!didThrowError) {
      throw new Error("Expected the command to throw an error.")
    }
  }
}
