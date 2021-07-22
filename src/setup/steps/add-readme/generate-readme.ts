import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { generateScriptTableRows } from "./generate-script-table-rows"
import { generateTechnologyTableRows } from "./generate-technology-table-rows"

export const generateReadme = async (answers: QuestionnaireAnswers) => {
  return /* md */ `
# ${answers.projectName}

🎉 Congratulations, your project was successfully bootstrapped with [Create Next Stack](https://github.com/akd-io/create-next-stack)!

To get started, run:

\`\`\`bash
yarn dev
\`\`\`

## Scripts

The table below provides names and descriptions of the NPM scripts available in this project.

Each script is run using \`yarn <script-name>\`. For example: \`yarn dev\`.

| Name | Description |
| ---- | ----------- |
${await generateScriptTableRows(answers)}

## Technologies

The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

| Name | Links |
| ---- | ----- |
${await generateTechnologyTableRows(answers)}
`
}
