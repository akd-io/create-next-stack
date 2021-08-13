import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"
import { Technology } from "../../flags-questionnaire"

const formStateManagementValuesArray = ["reactHookForm", "formik"] as const
export type FormStateManagementValue =
  typeof formStateManagementValuesArray[number]
const formStateManagementValues = arrayToKeyToKeyMap(
  formStateManagementValuesArray
)

const answerName = "formStateManagement"
type Answers = {
  [answerName]: FormStateManagementValue[]
}

export const promptFormStateManagement = async (
  technologies: Set<Technology>
): Promise<FormStateManagementValue[]> => {
  const { formStateManagement } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "Form state management:",
    choices: [
      {
        value: formStateManagementValues.reactHookForm,
        name: "React Hook Form",
        checked: true,
      },
      {
        value: formStateManagementValues.formik,
        name: "Formik",
      },
    ],
  })

  return formStateManagement
}
