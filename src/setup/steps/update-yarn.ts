import Command from "@oclif/command"
import execa from "execa"
import { throwError } from "../../error-handling"

export async function updateYarn(this: Command): Promise<void> {
  this.log("Updating Yarn...")

  try {
    await execa("npm i -g yarn")
  } catch (error) {
    throwError.call(this, "An error occurred while updating Yarn.", error)
  }
}
