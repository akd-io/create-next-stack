import { IConfig } from "@oclif/config"
import CreateNextStack from "."
import { UnknownObject } from "./helpers/is-unknown-object"
import { Writable } from "./helpers/writable"
import { validateProjectPathInput } from "./questionnaire/questions/validate-project-path"

/**
 * This function is only used to retrieve the ReturnType of a call to `createNextStackInstance.parse(CreateNextStack)`.
 *
 * **Do NOT call this function!**
 */
const temporaryWrapperForTypeSafety = () => {
  const createNextStackInstance = new CreateNextStack(
    [],
    {} as unknown as IConfig
  )
  return createNextStackInstance["parse"](CreateNextStack)
}

export type CreateNextStackParserOutput = ReturnType<
  typeof temporaryWrapperForTypeSafety
>

// Unvalidated Args and Flags types
export type CreateNextStackArgs = UnknownObject // Change to ParserOutput["args"] if it becomes strongly typed in the future. (Currently a normal object with any-values.)
export type CreateNextStackFlags = Partial<CreateNextStackParserOutput["flags"]> // Change to CreateNextStackParserOutput["flags"] if it becomes strongly typed in the future. (Currently not a Partial.)

// Package manager flag:
export const packageManagerOptions = ["yarn", "npm"] as const
export type PackageManagerOption = typeof packageManagerOptions[number]
export const writablePackageManagerOptions = packageManagerOptions as Writable<
  typeof packageManagerOptions
>

// Styling flag:
export const stylingOptions = [
  "emotion",
  "styled-components",
  "css-modules",
  "css-modules-with-sass",
] as const
export type StylingOption = typeof stylingOptions[number]
export const writableStylingOptions = stylingOptions as Writable<
  typeof stylingOptions
>

// Valid Args type and type guard
export type ValidCreateNextStackArgs = CreateNextStackArgs & { appName: string }
export const validateArgs = (
  args: CreateNextStackArgs
): args is ValidCreateNextStackArgs => {
  if (typeof args["appName"] !== "string") {
    throw new TypeError(
      'Outside interactive mode, you are required to specify a name for your application. Read about the "appName" argument using --help.'
    )
  }

  const appNameValidationResult = validateProjectPathInput(args["appName"])

  if (typeof appNameValidationResult === "string") {
    throw new TypeError("Invalid app name: " + appNameValidationResult)
  }

  return true
}

// Valid Flags type and type guard
export type ValidCreateNextStackFlags = CreateNextStackFlags & {
  "package-manager": PackageManagerOption
  styling: StylingOption
}
export const validateFlags = (
  flags: CreateNextStackFlags
): flags is ValidCreateNextStackFlags => {
  if (typeof flags["package-manager"] !== "string") {
    throw new TypeError(
      'Outside interactive mode, you are required to specify a package manager. Read about the "--package-manager" option using --help.'
    )
  }
  if (typeof flags.styling !== "string") {
    throw new TypeError(
      'Outside interactive mode, you are required to specify a styling method. Read about the "--styling" option using --help.'
    )
  }
  return true
}

export type ValidCNSInputs = {
  args: ValidCreateNextStackArgs
  flags: ValidCreateNextStackFlags
}
