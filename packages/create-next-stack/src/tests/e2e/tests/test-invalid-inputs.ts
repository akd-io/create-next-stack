import { expect, test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"

const invalidArgsArrays = {
  invalidName: [
    "INVALID-NAME",
    "--package-manager=pnpm",
    "--styling=css-modules",
  ],
  noAppName: [],
  noAppNameWithDebug: ["--debug"],
  noAppNameWithPackageManager: ["--package-manager=pnpm"],
  noFlags: ["app-name"],
  noFlagsWithDebug: ["app-name --debug"],
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

for (const [testName, args] of Object.entries(invalidArgsArrays)) {
  test(testName, () => {
    expect(async () => {
      testArgsWithoutFinalChecks(args)
    }).toThrow()
  })
}
