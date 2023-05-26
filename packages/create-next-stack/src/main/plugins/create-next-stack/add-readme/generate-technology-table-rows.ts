import { DeeplyReadonly } from "../../../helpers/deeply-readonly"
import { Technology } from "../../../plugin"

export const generateTechnologyTableRows = async (
  technologies: Array<Omit<DeeplyReadonly<Technology>, "id">>
): Promise<string> => {
  const rows = technologies.map((technology) => ({
    name: technology.name,
    links: technology.links.map((l) => `[${l.title}](${l.url})`).join(" - "),
  }))
  return rows.map((row) => `| ${row.name} | ${row.links} |`).join("\n")
}
