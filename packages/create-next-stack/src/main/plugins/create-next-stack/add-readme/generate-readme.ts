import endent from "endent"
import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getProjectNameOfPath } from "../../../helpers/get-project-name-of-path"
import { nonNull } from "../../../helpers/non-null"
import { runCommandMap } from "../../../helpers/package-manager-utils"
import { filterPlugins } from "../../../setup/setup"
import { getTechnologies } from "../sort-orders/technologies"
import { generateEnvironmentVariableTableRows } from "./generate-env-table-rows copy"
import { generateScriptTableRows } from "./generate-script-table-rows"
import { generateTechnologyTableRows } from "./generate-technology-table-rows"

export const generateReadme = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const { args, flags } = inputs

  const todos = (await filterPlugins(inputs))
    .flatMap((plugin) => plugin.todos)
    .filter(nonNull)

  const runCommand = runCommandMap[flags["package-manager"]]

  const technologies = await getTechnologies(inputs)

  const scriptTableRows = await generateScriptTableRows(inputs)
  const environmentVariableTableRows =
    await generateEnvironmentVariableTableRows(inputs)
  const technologyTableRows = await generateTechnologyTableRows(technologies)

  return endent`
    # ${getProjectNameOfPath(args.app_name)}

    🎉 Congratulations, your project was successfully generated with [Create Next Stack](https://www.create-next-stack.com/)!

    To get started, run:

    \`\`\`bash
    ${runCommand} dev
    \`\`\`

    ${
      todos.length > 0
        ? endent`
            ## Final Steps

            There are a few final steps that we were not able to perform automatically. We have provided a complete list for you below. You should take care of these before you can start developing your project. You can delete each item from the list as you go along.

            ### To do:
            
            ${todos.map((todo) => `- ${todo}`).join("\n")}
          `
        : ""
    }

    ${
      scriptTableRows != null
        ? endent`
          ## Scripts

          The table below provides names and descriptions of the npm scripts available in this project.

          Each script is run using \`${runCommand} <script-name>\`. For example: \`${runCommand} dev\`.

          | Name | Description |
          | ---- | ----------- |
          ${scriptTableRows}
        `
        : ""
    }

    ${
      environmentVariableTableRows != null
        ? endent`
          ## Environment Variables

          The table below provides names and descriptions of the environment variables used in this project.

          | Name | Description |
          | ---- | ----------- |
          ${environmentVariableTableRows}
        `
        : ""
    }

    ${
      technologyTableRows != null
        ? endent`
          ## Technologies

          The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

          | Name | Links |
          | ---- | ----- |
          ${technologyTableRows}
        `
        : ""
    }
  `
}
