import execa from "execa"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testInvalidInputs = async (
  createNextStackDir: string
): Promise<void> => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const argsArrays = {
    invalidName: ["INVALID-NAME"],
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
  }

  for (const args of Object.values(argsArrays)) {
    const prettyArgs = args.join(" ")
    logTestInfo(`Running command: ${pathToProdCLI} ${prettyArgs}`)

    let didThrowError = false
    await execa(pathToProdCLI, args, {
      timeout: minutesToMilliseconds(1),
      cwd: runDirectory,
      stdout: "inherit",
      stderr: "ignore",
    }).catch(() => {
      didThrowError = true
    })

    if (!didThrowError) {
      throw new Error(
        "Expected the following arguments to cause an error: " + prettyArgs
      )
    }
  }
}
