import Command from "@oclif/command"
import fs from "fs/promises"
import { throwError } from "../../error-handling"
import { QuestionnaireAnswers } from "../../questionnaire/questionnaire"
import { Step } from "../step"
import { setUpEmotionStep } from "./set-up-emotion"
import { setUpLintStagedStep } from "./set-up-lint-staged"
import { setUpPrettierStep } from "./set-up-prettier"

export const addReadmeStep: Step = {
  shouldRun: function (this) {
    return true
  },

  run: async function (this, answers) {
    this.log("Adding Readme...")

    try {
      const readmeString = generateReadme.call(this, answers)
      await fs.writeFile("README.md", readmeString)
    } catch (error) {
      throwError.call(this, "An error occurred while adding Readme.", error)
    }
  },
}

function generateReadme(this: Command, answers: QuestionnaireAnswers) {
  return /* md */ `
# ${answers.projectName}

This project was bootstrapped with [Boil](https://github.com/akd-io/boil).

## Scripts

The table below provides names and descriptions of the NPM scripts available in this project.

Each script is run using \`yarn <script-name>\`. For example: \`yarn dev\`.

| Name | Description |
| ---- | ----------- |
${generateScriptTableRows.call(this, answers)}

## Technologies

The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

| Name | Links |
| ---- | ----- |
${generateTechnologyTableRows.call(this, answers)}
`
}

function generateScriptTableRows(this: Command, answers: QuestionnaireAnswers) {
  type ScriptTableRow = {
    name: string
    description: string
    include: boolean
  }

  const scripts: ScriptTableRow[] = [
    {
      name: /* md */ `\`dev\``,
      description: /* md */ `Runs the Next.js development server.`,
      include: true,
    },
    {
      name: /* md */ `\`build\``,
      description: /* md */ `Generates a production build.`,
      include: true,
    },
    {
      name: /* md */ `\`start\``,
      description: /* md */ `Runs the Next.js production server built using \`build\` script.`,
      include: true,
    },
    {
      name: /* md */ `\`lint\``,
      description: /* md */ `Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.`,
      include: true,
    },
    {
      name: /* md */ `\`format\``,
      description: /* md */ `Runs Prettier to format the source code.`,
      include: setUpPrettierStep.shouldRun.call(this, answers),
    },
    {
      name: /* md */ `\`prepare\``,
      description: /* md */ `The [\`prepare\` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people run \`yarn install\`. This script should not be run manually.`,
      include: setUpPrettierStep.shouldRun.call(this, answers),
    },
  ]

  const scriptRowsString = scripts
    .filter((script) => script.include)
    .map((script) => `|${script.name}|${script.description}|`)
    .join("\n")

  return scriptRowsString
}

function generateTechnologyTableRows(
  this: Command,
  answers: QuestionnaireAnswers
) {
  type TechnologyTableRow = {
    name: string
    links: string
    include: boolean
  }

  const technologies: TechnologyTableRow[] = [
    {
      name: /* md */ `[Next.js](https://nextjs.org/)`,
      links: /* md */ `[Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)`,
      include: true,
    },
    {
      name: /* md */ `[React](https://reactjs.org/)`,
      links: /* md */ `[Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)`,
      include: true,
    },
    {
      name: /* md */ `[TypeScript](https://www.typescriptlang.org/)`,
      links: /* md */ `[Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)`,
      include: true,
    },
    {
      name: /* md */ `[Emotion](https://emotion.sh/docs/introduction)`,
      links: /* md */ `[Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)`,
      include: setUpEmotionStep.shouldRun.call(this, answers),
    },
    {
      name: /* md */ `[ESLint](https://eslint.org/)`,
      links: /* md */ `[Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint)`,
      include: true,
    },
    {
      name: /* md */ `[Prettier](https://prettier.io/)`,
      links: /* md */ `[Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)`,
      include: setUpPrettierStep.shouldRun.call(this, answers),
    },
    {
      name: /* md */ `[Husky](https://typicode.github.io/husky/)`,
      links: /* md */ `[Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)`,
      include: setUpLintStagedStep.shouldRun.call(this, answers),
    },
    {
      name: /* md */ `[lint-staged](https://github.com/okonet/lint-staged)`,
      links: /* md */ `[GitHub repo](https://github.com/okonet/lint-staged)`,
      include: setUpLintStagedStep.shouldRun.call(this, answers),
    },
    {
      name: /* md */ `[Yarn](https://yarnpkg.com/)`,
      links: /* md */ `[CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)`,
      include: true,
    },
  ]

  const technologyRowsString = technologies
    .filter((technology) => technology.include)
    .map((technology) => `|${technology.name}|${technology.links}|`)
    .join("\n")

  return technologyRowsString
}
