import endent from "endent"
import { ValidCNSInputs } from "../../../../../create-next-stack-types"
import { DeeplyReadonly } from "../../../../../helpers/deeply-readonly"
import { filterPlugins } from "../../../../../setup/setup"

// TODO: Add a technologies sort order here. Use TypeScript to force setting all plugin technologies.

// This type should match the one in the template below.
export type Technology = {
  name: string
  description: string
  links: Array<{
    title: string
    url: string
  }>
}

export const generateTechnologies = (inputs: ValidCNSInputs): string => {
  const pluginTechnologies = filterPlugins(inputs)
    .map((plugin): DeeplyReadonly<Technology[]> => plugin.technologies ?? [])
    .flat()

  return endent/* tsx */ `
    export type Technology = {
      name: string;
      description: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    export const technologies: Technology[] = ${JSON.stringify(
      pluginTechnologies,
      null,
      2
    )};
  `
}
