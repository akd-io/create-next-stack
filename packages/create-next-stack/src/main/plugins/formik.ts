import { createPlugin } from "../plugin"

export const formikPlugin = createPlugin({
  id: "formik",
  name: "Formik",
  description: "Adds support for Formik",
  active: ({ flags }) => Boolean(flags["formik"]),
  dependencies: {
    formik: {
      name: "formik",
      version: "^2.0.0",
    },
  },
  technologies: [
    {
      id: "formik",
      name: "Formik",
      description:
        "Formik is a React library that helps simplify the process of building and working with forms in React. It is designed to take care of the repetitive and tedious parts of form building, validation, and submission, making it easier and faster for developers to create forms.",
      links: [
        { title: "Website", url: "https://formik.org/" },
        { title: "Docs", url: "https://formik.org/docs/overview" },
        { title: "GitHub", url: "https://github.com/formium/formik" },
      ],
    },
  ],
} as const)
