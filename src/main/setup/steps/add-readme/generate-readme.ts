import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getProjectNameOfPath } from "../../../helpers/get-project-name-of-path"
import { generateScriptTableRows } from "./generate-script-table-rows"
import { generateTechnologyTableRows } from "./generate-technology-table-rows"

export const generateReadme = async (
  inputs: ValidCNSInputs
): Promise<string> => endent/* md */ `
  # ${getProjectNameOfPath(inputs.args.appName)}

  🎉 Congratulations, your project was successfully bootstrapped with [Create Next Stack](https://www.create-next-stack.com/)!

  To get started, run:

  \`\`\`bash
  ${inputs.flags["package-manager"] === "yarn" ? "yarn dev" : "npm run dev"}
  \`\`\`

  ## Scripts

  The table below provides names and descriptions of the npm scripts available in this project.

  Each script is run using \`${
    inputs.flags["package-manager"] === "yarn" ? "yarn" : "npm run"
  } <script-name>\`. For example: \`${
  inputs.flags["package-manager"] === "yarn" ? "yarn" : "npm run"
} dev\`.

  | Name | Description |
  | ---- | ----------- |
  ${await generateScriptTableRows(inputs)}

  ## Technologies

  The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

  | Name | Links |
  | ---- | ----- |
  ${await generateTechnologyTableRows(inputs)}
`
