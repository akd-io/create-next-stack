import Command from "@oclif/command"
import execa from "execa"

export async function createNextApp(
  this: Command,
  projectName: string
): Promise<void> {
  this.log("Creating Next.js app...")

  try {
    await execa(`yarn create next-app ${projectName} --typescript`)
  } catch (error) {
    this.error("An error occurred while creating Next.js app.", {
      exit: 1,
    })
  }
}
