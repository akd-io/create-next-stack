import { Plugin } from "../plugin"

export const typescriptPlugin: Plugin = {
  id: "typescript",
  name: "Typescript",
  description: "Adds relevant Typescript documentation",
  active: true,
  technologies: [
    {
      id: "typescript",
      name: "TypeScript",
      description:
        "TypeScript is a programming language developed and maintained by Microsoft. It is a syntactical superset of JavaScript, adding static typing to the language. TypeScript shows useful type errors to developers during development in modern IDEs, saving time developers would have otherwise spent debugging the software at runtime.",
      links: [
        { title: "Website", url: "https://www.typescriptlang.org/" },
        { title: "Docs", url: "https://www.typescriptlang.org/docs/" },
        { title: "GitHub", url: "https://github.com/microsoft/TypeScript" },
        { title: "Wikipedia", url: "https://en.wikipedia.org/wiki/TypeScript" },
      ],
    },
  ],
}
