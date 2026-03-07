import { Technology } from "../../../plugin"

export const generateTechnologyTableRows = async (
  technologies: Array<Omit<Technology, "id">>
): Promise<string | null> => {
  if (technologies.length === 0) {
    return null
  }
  const rows = technologies.map((technology) => ({
    name: technology.name,
    links: technology.links.map((l) => `[${l.title}](${l.url})`).join(" - "),
  }))
  return rows.map((row) => `| ${row.name} | ${row.links} |`).join("\n")
}
