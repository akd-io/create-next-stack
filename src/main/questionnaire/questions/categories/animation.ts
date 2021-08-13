import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { Technology } from "../../flags-questionnaire"

const animationValuesArray = ["framerMotion"] as const
export type AnimationValue = typeof animationValuesArray[number]
const animationValues = arrayToKeyToKeyMap(animationValuesArray)

const answerName = "animation"
type Answers = {
  [answerName]: AnimationValue[]
}

export const promptAnimation = async (
  technologies: Set<Technology>
): Promise<AnimationValue[]> => {
  const { animation } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Animation:",
    choices: [
      {
        value: animationValues.framerMotion,
        name: "Framer Motion",
        checked: true,
      },
    ],
    validate: (input: unknown): string | true => {
      if (!Array.isArray(input)) {
        throw new TypeError("Expected input to be an array.")
      }

      if (
        technologies.has("chakra") &&
        !input.includes(animationValues.framerMotion)
      ) {
        return "Framer Motion is required by Chakra UI."
      }

      return true
    },
  })

  return animation
}
