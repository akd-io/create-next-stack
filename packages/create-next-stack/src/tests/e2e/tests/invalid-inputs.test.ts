import { describe, expect, test } from "@jest/globals"
import { testArgsWithoutFinalChecks } from "../helpers/test-args"
import { oneMinute } from "../helpers/timeout"

const invalidArgsArrays: Array<{ name: string; args: string[] }> = [
  {
    name: "invalidName",
    args: ["INVALID-NAME", "--package-manager=pnpm", "--styling=css-modules"],
  },
  { name: "noAppName", args: [] },
  { name: "noAppNameWithDebug", args: ["--debug"] },
  { name: "noAppNameWithPackageManager", args: ["--package-manager=pnpm"] },
  { name: "noFlags", args: ["app-name"] },
  { name: "noFlagsWithDebug", args: ["app-name --debug"] },
  { name: "noStyling", args: ["--package-manager=npm"] },
  { name: "noPackageManager", args: ["--styling=css-modules"] },
  {
    name: "preCommitHookWithoutPrettier",
    args: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--formatting-pre-commit-hook",
    ],
  },
  {
    name: "mantineWithoutEmotion",
    args: ["--package-manager=pnpm", "--styling=css-modules", "--mantine"],
  },
  {
    name: "chakraWithoutEmotion",
    args: [
      "--package-manager=pnpm",
      "--styling=css-modules",
      "--chakra",
      "--framer-motion",
    ],
  },
  {
    name: "chakraWithoutFramerMotion",
    args: ["--package-manager=pnpm", "--styling=emotion", "--chakra"],
  },
  {
    name: "materialUiWithoutEmotion",
    args: ["--package-manager=pnpm", "--styling=css-modules", "--material-ui"],
  },
]

describe("testInvalidInputs", () => {
  test.each(invalidArgsArrays)(
    "$name",
    async ({ args }) => {
      await expect(async () => {
        await testArgsWithoutFinalChecks(args)
      }).rejects.toThrow()
    },
    oneMinute
  )
})
