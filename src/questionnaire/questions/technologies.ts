import inquirer, { Separator } from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const techValueArray = <const>[
  "prettier",
  "emotion",
  "styledComponents",
  "cssModules",
  "reactHookForm",
  "formik",
  "framerMotion",
  "preCommitHook",
]
export type TechValue = typeof techValueArray[number]
export const techValues = arrayToKeyToKeyMap(techValueArray)

const techChoices: {
  [K in TechValue]: {
    name: string
    value: K
    checked?: boolean
  }
} = {
  prettier: {
    value: "prettier",
    name: "Prettier",
    checked: true,
  },
  emotion: {
    value: "emotion",
    name: "Emotion",
    checked: true,
  },
  styledComponents: {
    value: "styledComponents",
    name: "Styled Components",
  },
  cssModules: {
    value: "cssModules",
    name: "CSS Modules",
  },
  reactHookForm: {
    value: "reactHookForm",
    name: "React Hook Form",
    checked: true,
  },
  formik: {
    value: "formik",
    name: "Formik",
  },
  framerMotion: {
    value: "framerMotion",
    name: "Framer Motion",
  },
  preCommitHook: {
    value: "preCommitHook",
    name: "Formatting pre-commit hook (Husky & lint-staged)",
    checked: true,
  },
}

const answerName = "technologies"
type TechnologiesAnswers = {
  [answerName]: TechValue[]
}

export async function promptTechnologies() {
  const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What technologies are you looking to use?",
    pageSize: 10,
    choices: [
      new Separator("Formatting:"),
      techChoices.prettier,

      new Separator("Styling:"),
      techChoices.emotion,
      techChoices.styledComponents,
      techChoices.cssModules,

      new Separator("Form state management:"),
      techChoices.reactHookForm,
      techChoices.formik,

      new Separator("Animation:"),
      techChoices.framerMotion,

      new Separator("Miscellaneous:"),
      techChoices.preCommitHook,
    ],
    validate: (technologies) => {
      if (
        technologies.includes(techValues.preCommitHook) &&
        !technologies.includes(techValues.prettier)
      ) {
        return `${techChoices.preCommitHook.name} requires ${techChoices.prettier.name}`
      }

      const onlyOneStylingSelected = oneOf(
        technologies.includes(techValues.emotion),
        technologies.includes(techValues.styledComponents),
        technologies.includes(techValues.cssModules)
      )
      if (!onlyOneStylingSelected) {
        return `You have to pick exactly one styling solution.`
      }

      return true
    },
  })

  return technologies
}

const oneOf = (...booleans: boolean[]) => {
  const count = booleans.reduce((previous, current) => {
    return current ? previous + 1 : previous
  }, 0)
  return count === 1
}
