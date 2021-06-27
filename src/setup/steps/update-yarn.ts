import Command from "@oclif/command"
import execa from "execa"

export async function updateYarn(this: Command): Promise<void> {
  this.log("Updating Yarn...")

  try {
    await execa("npm i -g yarn")
  } catch (error) {
    this.error("An error occurred while updating Yarn.", {
      exit: 1,
    })
  }
}
