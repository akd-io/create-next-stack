import inquirer from "inquirer"
import Boil from ".."

export async function getProjectName(this: Boil): Promise<void> {
  const { projectName } = await inquirer.prompt({
    message: "What is the name of your project?",
    name: "projectName",
    type: "input",
  })

  if (typeof projectName === "string") {
    this.answers.projectName = projectName
  } else {
    // TODO: Add validation
    this.error(
      "An error occurred while reading project name. The input project name was not a string.",
      {
        exit: 1,
      }
    )
  }
}
