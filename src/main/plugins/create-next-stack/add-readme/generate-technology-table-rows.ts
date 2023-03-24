import { ValidCNSInputs } from "../../../create-next-stack-types"
import { filterPlugins } from "../../../setup/setup"

export const generateTechnologyTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  type TechnologyTableRow = {
    name: string
    links: string
  }

  const technologies: TechnologyTableRow[] = filterPlugins(inputs).flatMap(
    ({ technologies }) => {
      if (!technologies) return []
      return technologies.map((technology) => ({
        name: technology.name,
        links: technology.links
          .map((l) => `[${l.title}](${l.url})`)
          .join(" - "),
      }))
    }
  )

  return technologies
    .map((technology) => `| ${technology.name} | ${technology.links} |`)
    .join("\n")
}
