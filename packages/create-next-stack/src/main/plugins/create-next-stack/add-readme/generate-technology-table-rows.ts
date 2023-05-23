import { ValidCNSInputs } from "../../../create-next-stack-types"
import { getTechnologies } from "../sort-orders/technologies"

export const generateTechnologyTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const technologies = getTechnologies(inputs).map((technology) => ({
    name: technology.name,
    links: technology.links.map((l) => `[${l.title}](${l.url})`).join(" - "),
  }))
  return technologies
    .map((technology) => `| ${technology.name} | ${technology.links} |`)
    .join("\n")
}
