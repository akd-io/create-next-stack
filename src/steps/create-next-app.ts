import execa from "execa"
import Boil from ".."

export async function createNextApp(this: Boil): Promise<void> {
  this.log("Creating Next.js app...")

  try {
    await execa(`yarn create next-app ${this.answers.projectName} --typescript`)
  } catch (error) {
    this.error("An error occurred while creating Next.js app.", {
      exit: 1,
    })
  }
}
