import { createPlugin } from "../plugin"

export const reactHookFormPlugin = createPlugin({
  id: "react-hook-form",
  name: "React Hook Form",
  description: "Adds support for React Hook Form",
  active: ({ flags }) => Boolean(flags["react-hook-form"]),
  dependencies: {
    "react-hook-form": {
      name: "react-hook-form",
      version: "^7.0.0",
    },
  },
  technologies: [
    {
      name: "React Hook Form",
      description:
        "React Hook Form is a React library that simplifies the process of implementing forms from state management to input validation and error handling. Unlike previous form libraries, it provides better performance by storing the form state in the dom by default.",
      links: [
        { title: "Website", url: "https://react-hook-form.com/" },
        { title: "Docs", url: "https://react-hook-form.com/get-started" },
        {
          title: "GitHub",
          url: "https://github.com/react-hook-form/react-hook-form",
        },
      ],
    },
  ],
} as const)
