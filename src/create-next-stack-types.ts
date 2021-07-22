import CreateNextStack from "."
import { UnknownObject } from "./helpers/is-unknown-object"
import { Writable } from "./helpers/writable"

/**
 * This function is only used to retrieve the ReturnType of a call to `createNextStackInstance.parse(CreateNextStack)`.
 *
 * **Do NOT call this function!**
 */
const temporaryWrapperForTypeSafety = () => {
  const createNextStackInstance = new CreateNextStack([], {} as unknown as any)
  return createNextStackInstance["parse"](CreateNextStack)
}

export type CreateNextStackParserOutput = ReturnType<
  typeof temporaryWrapperForTypeSafety
>

// Unvalidated Args and Flags types
export type CreateNextStackArgs = UnknownObject // Change to ParserOutput["args"] if it becomes strongly typed in the future. (Currently a normal object with any-values.)
export type CreateNextStackFlags = Partial<CreateNextStackParserOutput["flags"]> // Change to CreateNextStackParserOutput["flags"] if it becomes strongly typed in the future. (Currently not a Partial.)

// Styling flag:
export const stylingOptions = [
  "emotion",
  "styled-components",
  "css-modules",
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
  return typeof args.appName === "string"
}

// Valid Flags type and type guard
export type ValidCreateNextStackFlags = CreateNextStackFlags & {
  styling: StylingOption
}
export const validateFlags = (
  flags: CreateNextStackFlags
): flags is ValidCreateNextStackFlags => {
  return flags.styling != null
}

export type ValidCNSInputs = {
  args: ValidCreateNextStackArgs
  flags: ValidCreateNextStackFlags
}
