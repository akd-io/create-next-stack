import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"

const continuousIntegrationValuesArray = ["githubActions"] as const
type ContinuousIntegrationValue =
  typeof continuousIntegrationValuesArray[number]
const continuousIntegrationValues = arrayToKeyToKeyMap(
  continuousIntegrationValuesArray
)

const answerName = "continuousIntegrations"
type Answers = {
  [answerName]: ContinuousIntegrationValue[]
}

export const promptContinuousIntegration = async (): Promise<
  ContinuousIntegrationValue[]
> => {
  const { continuousIntegrations } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Continuous integration:",
    choices: [
      {
        value: continuousIntegrationValues["githubActions"],
        name: "GitHub Actions",
        checked: true,
      },
    ],
  })

  return continuousIntegrations
}
