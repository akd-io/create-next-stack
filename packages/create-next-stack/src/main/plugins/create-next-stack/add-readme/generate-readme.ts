import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getProjectNameOfPath } from "../../../helpers/get-project-name-of-path"
import { runCommandMap } from "../../../helpers/package-manager-utils"
import { generateScriptTableRows } from "./generate-script-table-rows"
import { generateTechnologyTableRows } from "./generate-technology-table-rows"

export const generateReadme = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const { args, flags } = inputs

  const runCommand = runCommandMap[flags["package-manager"]]

  return endent`
    # ${getProjectNameOfPath(args.appName)}

    🎉 Congratulations, your project was successfully generated with [Create Next Stack](https://www.create-next-stack.com/)!

    To get started, run:

    \`\`\`bash
    ${runCommand} dev
    \`\`\`

    ## Scripts

    The table below provides names and descriptions of the npm scripts available in this project.

    Each script is run using \`${runCommand} <script-name>\`. For example: \`${runCommand} dev\`.

    | Name | Description |
    | ---- | ----------- |
    ${await generateScriptTableRows(inputs)}

    ## Technologies

    The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

    | Name | Links |
    | ---- | ----- |
    ${await generateTechnologyTableRows(inputs)}
  `
}
