import endent from "endent"
import { ValidCNSInputs } from "../../../../../create-next-stack-types"
import { stringify } from "../../../../../helpers/stringify"
import { getTechnologies } from "../../../sort-orders/technologies"

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
  const technologies: Technology[] = getTechnologies(inputs)

  return endent`
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
