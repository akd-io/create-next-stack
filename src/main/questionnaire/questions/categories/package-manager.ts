import inquirer from "inquirer"
import {
  PackageManagerOption,
  packageManagerOptions,
} from "../../../create-next-stack-types"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"

export type PackageManagerValue = PackageManagerOption
const packageManagerValues = arrayToKeyToKeyMap(packageManagerOptions)

const answerName = "packageManager"
type Answers = {
  [answerName]: PackageManagerValue
}

export const promptPackageManager = async (): Promise<PackageManagerValue> => {
  const { packageManager } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "list",
    message: "Pick your preferred package manager:",
    choices: [
      {
        value: packageManagerValues.yarn,
        name: "Yarn",
        checked: true,
      },
      {
        value: packageManagerValues.npm,
        name: "npm",
      },
    ],
  })

  return packageManager
}
