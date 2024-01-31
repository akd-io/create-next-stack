import { Config } from "@oclif/core"
import CreateNextStack from "./commands/create-next-stack"
import { validateProjectPathInput } from "./helpers/validate-project-path"
import { Writable } from "./helpers/writable"

/**
 * This function is only used to retrieve the ReturnType of a call to `createNextStackInstance.parse(CreateNextStack)`.
 *
 * **Do NOT call this function!**
 */
const temporaryWrapperForTypeSafety = () => {
  const createNextStackInstance = new CreateNextStack(
    [],
    {} as unknown as Config
  )
  return createNextStackInstance["parse"](CreateNextStack)
}

export type CreateNextStackParserOutput = ReturnType<
  typeof temporaryWrapperForTypeSafety
>

export type CreateNextStackArgs = Awaited<CreateNextStackParserOutput>["args"]
export type CreateNextStackFlags = Awaited<CreateNextStackParserOutput>["flags"]

// Package manager flag:
export const packageManagerOptions = ["pnpm", "yarn", "npm"] as const
export type PackageManager = (typeof packageManagerOptions)[number]
export const writablePackageManagerOptions = packageManagerOptions as Writable<
  typeof packageManagerOptions
>

// Styling flag:
export const stylingOptions = [
  "emotion",
  "styled-components",
  "tailwind-css",
  "css-modules",
  "css-modules-with-sass",
  "panda-css",
] as const
export type StylingOption = (typeof stylingOptions)[number]
export const writableStylingOptions = stylingOptions as Writable<
  typeof stylingOptions
>

// Valid Args type and type guard
export const validateArgs = (
  args: CreateNextStackArgs
): args is CreateNextStackArgs => {
  const appNameValidationResult = validateProjectPathInput(args.app_name)
  if (typeof appNameValidationResult === "string") {
    throw new TypeError("Invalid app name: " + appNameValidationResult)
  }
  return true
}

// Valid Flags type and type guard
export type ValidCreateNextStackFlags = CreateNextStackFlags & {
  "package-manager": PackageManager
  styling: StylingOption
}
export const validateFlags = (
  flags: CreateNextStackFlags
): flags is ValidCreateNextStackFlags => {
  // TODO: Define validator using zod.
  if (flags.chakra && flags.styling !== "emotion") {
    throw new Error(
      "Chakra UI (category: Component library, flag: --chakra) requires Emotion (category: Styling, flag: --styling=emotion)."
    )
  }
  if (flags.mantine && flags.styling !== "emotion") {
    throw new Error(
      "Mantine (category: Component library, flag: --mantine) requires Emotion (category: Styling, flag: --styling=emotion)."
    )
  }
  if (flags["material-ui"] && flags.styling !== "emotion") {
    throw new Error(
      "Material UI (category: Component library, flag: --material-ui) requires Emotion (category: Styling, flag: --styling=emotion)."
    )
  }
  if (flags.chakra && !flags["framer-motion"]) {
    throw new Error(
      "Chakra UI (category: Component library, flag: --chakra) requires Framer Motion (category: Animation, flag: --framer-motion)."
    )
  }
  if (flags["formatting-pre-commit-hook"] && !flags["prettier"]) {
    throw new Error(
      "Formatting pre-commit hook (category: Miscellaneous, flag: --formatting-pre-commit-hook) requires Prettier (category: Formatting, flag: --prettier)."
    )
  }
  return true
}

export type ValidCNSInputs = {
  args: CreateNextStackArgs
  flags: ValidCreateNextStackFlags
}
