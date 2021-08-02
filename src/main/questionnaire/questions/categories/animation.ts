import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"

const animationValuesArray = ["framerMotion"] as const
type AnimationValue = typeof animationValuesArray[number]
const animationValues = arrayToKeyToKeyMap(animationValuesArray)

const answerName = "animation"
type Answers = {
  [answerName]: AnimationValue[]
}

// TODO: Make Framer Motion disabled when Chakra UI has been selected.

export const promptAnimation = async (): Promise<AnimationValue[]> => {
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
  })

  return animation
}
