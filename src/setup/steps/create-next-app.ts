import Command from "@oclif/command"
import execa from "execa"
import { throwError } from "../../error-handling"

export async function createNextApp(
  this: Command,
  projectName: string
): Promise<void> {
  this.log("Creating Next.js app...")

  try {
    await execa(`yarn create next-app ${projectName} --typescript`)
  } catch (error) {
    throwError.call(
      this,
      "An error occurred while creating Next.js app.",
      error
    )
  }
}
