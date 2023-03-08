import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const githubActionsPlugin = constrain<Plugin>()({
  name: "GitHub Actions",
  description: "Adds support for GitHub Actions",
  technologies: [
    {
      name: "GitHub Actions",
      description:
        "GitHub Actions is a tool for automating software development workflows. It is integrated with GitHub repositories and enables developers to automate tasks such as building, testing, and deploying their applications.",
      links: [
        {
          title: "Website",
          url: "https://github.com/features/actions",
        },
        {
          title: "Docs",
          url: "https://docs.github.com/en/actions",
        },
        {
          title: "Workflow syntax",
          url: "https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions",
        },
      ],
    },
  ],
} as const)
