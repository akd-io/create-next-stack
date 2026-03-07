import aldent from "aldent"
import { ValidCNSInputs } from "../../../create-next-stack-types.ts"
import { getProjectNameOfPath } from "../../../helpers/get-project-name-of-path.ts"
import { nonNull } from "../../../helpers/non-null.ts"
import { runCommandMap } from "../../../helpers/package-manager-utils.ts"
import { filterPlugins } from "../../../setup/setup.ts"
import { getTechnologies } from "../sort-orders/technologies.ts"
import { generateEnvironmentVariableTableRows } from "./generate-env-table-rows copy.ts"
import { generateScriptTableRows } from "./generate-script-table-rows.ts"
import { generateTechnologyTableRows } from "./generate-technology-table-rows.ts"

export const generateReadme = async (
  inputs: ValidCNSInputs,
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

  return aldent`
    # ${getProjectNameOfPath(args.app_name)}

    🎉 Congratulations, your project was successfully generated with [Create Next Stack](https://www.create-next-stack.com/)!

    To get started, run:

    \`\`\`bash
    ${runCommand} dev
    \`\`\`

    ${
      todos.length > 0
        ? aldent`
            ## Final Steps

            There are a few final steps that we were not able to perform automatically. We have provided a complete list for you below. You should take care of these before you can start developing your project. You can delete each item from the list as you go along.

            ### To do:
            
            ${todos.map((todo) => `- ${todo}`).join("\n")}
          `
        : ""
    }

    ${
      scriptTableRows != null
        ? aldent`
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
        ? aldent`
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
        ? aldent`
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
