import inquirer from "inquirer"
import { arrayToKeyToKeyMap } from "../../../helpers/array-to-key-to-key-map"

const formStateManagementValuesArray = ["reactHookForm", "formik"] as const
type FormStateManagementValue = typeof formStateManagementValuesArray[number]
const formStateManagementValues = arrayToKeyToKeyMap(
  formStateManagementValuesArray
)

const answerName = "formStateManagement"
type Answers = {
  [answerName]: FormStateManagementValue[]
}

export const promptFormStateManagement = async (): Promise<
  FormStateManagementValue[]
> => {
  const { formStateManagement } = await inquirer.prompt<Answers>({
    name: answerName,
    type: "checkbox",
    message: "What continuous integration technologies are you looking to use?",
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
