import { prettyCommand } from "../../../main/helpers/pretty-command"
import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"
import { logTestInfo } from "../test-logging"

export const testInvalidInputs = async (
  createNextStackDir: string
): Promise<void> => {
  logTestInfo(`Running test: ${testInvalidInputs.name}`)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const argsArrays = {
    invalidName: [
      "INVALID-NAME",
      "--package-manager=pnpm",
      "--styling=css-modules",
    ],
    noStyling: ["--package-manager=npm"],
    noPackageManager: ["--styling=css-modules"],
    preCommitHookRequiresPrettier: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--formatting-pre-commit-hook",
    ],
    chakraWithoutEmotion: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--chakra",
      "--framer-motion",
    ],
    chakraWithoutFramerMotion: [
      "--package-manager=pnpm",
      "--styling=emotion",
      "--chakra",
    ],
    materialUiWithoutEmotion: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--material-ui",
    ],
  }

  for (const args of Object.values(argsArrays)) {
    logTestInfo(
      "Running command:",
      prettyCommand(pathToCLI, args),
      "in directory:",
      runDirectory
    )

    let didThrowError = false
    await runCommand(pathToCLI, args, {
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
