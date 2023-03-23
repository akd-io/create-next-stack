import endent from "endent"
import { ValidCNSInputs } from "../../../../../create-next-stack-types"
import { DeeplyReadonly } from "../../../../../helpers/deeply-readonly"
import { stringify } from "../../../../../helpers/stringify"
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
  const pluginTechnologies = filterPlugins(inputs).flatMap(
    (plugin): DeeplyReadonly<Technology[]> => plugin.technologies ?? []
  )

  return endent`
    export type Technology = {
      name: string;
      description: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    export const technologies: Technology[] = ${stringify(pluginTechnologies)};
  `
}
