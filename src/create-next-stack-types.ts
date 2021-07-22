import CreateNextStack from "."
import { UnknownObject } from "./helpers/is-unknown-object"

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
export type CreateNextStackArgs = UnknownObject // Change to ParserOutput["args"] if it becomes strongly typed in the future. (Currently a normal object with any-values.)
export type CreateNextStackFlags = Partial<CreateNextStackParserOutput["flags"]> // Change to CreateNextStackParserOutput["flags"] if it becomes strongly typed in the future. (Currently not a Partial.)
