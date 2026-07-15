import aldent from "aldent"
import type { Plugin } from "../plugin.ts"

export const shadcnPlugin: Plugin = {
  id: "shadcn",
  name: "shadcn/ui",
  description: "Adds support for shadcn/ui component library",
  active: ({ flags }) => Boolean(flags["shadcn"]),
  dependencies: [
    { name: "class-variance-authority", version: "^0.7.0" },
    { name: "clsx", version: "^2.1.0" },
    { name: "tailwind-merge", version: "^3.0.0" },
    { name: "tailwindcss-animate", version: "^1.0.0" },
    { name: "lucide-react", version: "^0.400.0" },
  ],
  technologies: [
    {
      id: "shadcn",
      name: "shadcn/ui",
      description:
        "shadcn/ui is a collection of beautifully designed, accessible components that you can copy and paste into your apps. Unlike traditional component libraries, shadcn/ui gives you ownership of the component code — no npm dependency to lock into. Built on Radix UI primitives and styled with Tailwind CSS, it offers full customization and composability.",
      links: [
        { title: "Website", url: "https://ui.shadcn.com/" },
        { title: "Docs", url: "https://ui.shadcn.com/docs" },
        { title: "GitHub", url: "https://github.com/shadcn-ui/ui" },
      ],
    },
  ],
  devDependencies: [{ name: "shadcn", version: "^4.0.0" }],
  scripts: [
    {
      name: "ui:add",
      description: "Adds a shadcn/ui component to the project.",
      command: "shadcn add",
    },
  ],
  todos: [
    `Add components to your project by running \`pnpm dlx shadcn@latest add button\` (or any component name). See https://ui.shadcn.com/docs/components for the full list.`,
  ],
  addFiles: [
    {
      destination: "components.json",
      content: aldent`
        {
          "$schema": "https://ui.shadcn.com/schema.json",
          "style": "new-york",
          "rsc": true,
          "tsx": true,
          "tailwind": {
            "config": "",
            "css": "app/globals.css",
            "baseColor": "neutral",
            "cssVariables": true,
            "prefix": ""
          },
          "aliases": {
            "components": "@/components",
            "utils": "@/lib/utils",
            "ui": "@/components/ui",
            "lib": "@/lib",
            "hooks": "@/hooks"
          },
          "iconLibrary": "lucide"
        }
      `,
    },
    {
      destination: "lib/utils.ts",
      content: aldent`
        import { clsx, type ClassValue } from "clsx"
        import { twMerge } from "tailwind-merge"

        export function cn(...inputs: ClassValue[]) {
          return twMerge(clsx(inputs))
        }
      `,
    },
  ],
}
