import { test } from "@jest/globals"
import { runCommand } from "../../../main/helpers/run-command"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

test("testInvalidInputs", async () => {
  const { pathToCLI, runDirectory } = await prepareE2eTest()

  const argsArrays = {
    invalidName: [
      "INVALID-NAME",
      "--package-manager=pnpm",
      "--styling=css-modules",
    ],
    noStyling: ["--package-manager=npm"],
    noPackageManager: ["--styling=css-modules"],
    preCommitHookWithoutPrettier: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--formatting-pre-commit-hook",
    ],
    mantineWithoutEmotion: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--mantine",
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
})
