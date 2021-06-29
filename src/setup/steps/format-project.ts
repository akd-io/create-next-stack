import Command from "@oclif/command"
import execa from "execa"
import { throwError } from "../../error-handling"

export async function formatProject(this: Command): Promise<void> {
  this.log("Formatting project...")

  try {
    await execa("yarn format")
  } catch (error) {
    throwError.call(this, "An error occurred while formatting project.", error)
  }
}
