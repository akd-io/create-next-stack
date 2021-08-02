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

// TODO: Make Framer Motion disabled when Chakra UI has been selected.

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
        checked: true, // Important! If this is changed to false, make sure to add the Chakra UI case, where it should still be checked.
        disabled: technologies.has("chakra"),
      },
    ],
  })

  return animation
}
