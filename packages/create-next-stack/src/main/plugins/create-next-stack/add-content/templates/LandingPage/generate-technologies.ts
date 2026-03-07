import aldent from "aldent"
import { ValidCNSInputs } from "../../../../../create-next-stack-types.ts"
import { stringify } from "../../../../../helpers/stringify.ts"
import { getTechnologies } from "../../../sort-orders/technologies.ts"

// This type should match the one in the template below.
export type Technology = {
  name: string
  description: string
  links: Array<{
    title: string
    url: string
  }>
}

export const generateTechnologies = async (
  inputs: ValidCNSInputs,
): Promise<string> => {
  const technologies: Technology[] = await getTechnologies(inputs)

  return aldent`
    export type Technology = {
      name: string;
      description: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    export const technologies: Technology[] = ${stringify(technologies)};
  `
}
