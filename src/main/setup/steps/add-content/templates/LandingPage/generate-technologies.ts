import endent from "endent"
import { ValidCNSInputs } from "../../../../../create-next-stack-types"
import { setUpLintStagedStep } from "../../../set-up-lint-staged"

type Technology = {
  name: string
  filter: boolean
  description: string
  links: Array<{
    title: string
    url: string
  }>
}

export const generateTechnologies = (inputs: ValidCNSInputs): string => {
  const { flags } = inputs
  const technologies: Technology[] = [
    {
      name: "Next.js",
      filter: true,
      description: `Next.js is the leading framework in the React ecosystem, featuring server-side rendering and static site generation among other rendering techniques. Utilizing its file-based routing architecture and its zero-config design principle, it is designed to enhance both the user and developer experience.`,
      links: [
        {
          title: "Website",
          url: "https://nextjs.org/",
        },
        {
          title: "Docs",
          url: "https://nextjs.org/docs",
        },
        {
          title: "Learn Next.js",
          url: "https://nextjs.org/learn",
        },
        {
          title: "GitHub",
          url: "https://github.com/vercel/next.js",
        },
        {
          title: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/Next.js",
        },
      ],
    },
    {
      name: "React",
      filter: true,
      description: `React is a JavaScript library for building declarative and flexible user interfaces in a functional paradigm. Being the most popular front-end library in the world, it enables developers to create reusable UI components that can be composed to build complex web applications.`,
      links: [
        {
          title: "Website",
          url: "https://reactjs.org/",
        },
        {
          title: "Docs",
          url: "https://reactjs.org/docs/getting-started.html",
        },
        {
          title: "GitHub",
          url: "https://github.com/facebook/react",
        },
        {
          title: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
        },
      ],
    },
    {
      name: "TypeScript",
      filter: true,
      description: `TypeScript is a programming language developed and maintained by Microsoft. It is a syntactical superset of JavaScript, adding static typing to the language. TypeScript shows useful type errors to developers during development in modern IDEs, saving time developers would have otherwise spent debugging the software at runtime.`,
      links: [
        {
          title: "Website",
          url: "https://www.typescriptlang.org/",
        },
        {
          title: "Docs",
          url: "https://www.typescriptlang.org/docs/",
        },
        {
          title: "GitHub",
          url: "https://github.com/microsoft/TypeScript",
        },
        {
          title: "Wikipedia",
          url: "https://en.wikipedia.org/wiki/TypeScript",
        },
      ],
    },
    {
      name: "Emotion",
      filter: flags.styling === "emotion",
      description: `Emotion is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.`,
      links: [
        {
          title: "Website",
          url: "https://emotion.sh/",
        },
        {
          title: "Docs",
          url: "https://emotion.sh/docs/introduction",
        },
        {
          title: "GitHub",
          url: "https://github.com/emotion-js/emotion",
        },
      ],
    },
    {
      name: "Styled Components",
      filter: flags.styling === "styled-components",
      description: `Styled Components is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.`,
      links: [
        {
          title: "Website",
          url: "https://styled-components.com/",
        },
        {
          title: "Docs",
          url: "https://styled-components.com/docs",
        },
        {
          title: "GitHub",
          url: "https://github.com/styled-components/styled-components",
        },
      ],
    },
    {
      name: "Tailwind CSS",
      filter: flags.styling === "tailwind-css",
      description: `Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. Its utilities come as helper classes that function as shorthands for the most common CSS patterns that developers use all the time.`,
      links: [
        {
          title: "Website",
          url: "https://tailwindcss.com/",
        },
        {
          title: "Docs",
          url: "https://tailwindcss.com/docs",
        },
        {
          title: "GitHub",
          url: "https://github.com/tailwindlabs/tailwindcss",
        },
      ],
    },
    {
      name: "CSS Modules",
      filter:
        flags.styling === "css-modules" ||
        flags.styling === "css-modules-with-sass",
      description: `CSS Modules are CSS files in which all class names are scoped locally to the component importing them. This means that developers can use the same CSS class name in different files without worrying about naming conflicts. Gone are the days of writing BEM class names!`,
      links: [
        {
          title: "Website",
          url: "https://github.com/css-modules/css-modules",
        },
        {
          title: "Docs",
          url: "https://github.com/css-modules/css-modules",
        },
        {
          title: "Next.js-specific docs",
          url: "https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css",
        },
      ],
    },
    {
      name: "Sass",
      filter: flags.styling === "css-modules-with-sass",
      description: `Sass is a stylesheet language that is compiled to CSS. It is an extension of CSS that adds extra powers to the basic language. It allows developers to use variables, nested rules, mixins, inline imports, and more.`,
      links: [
        {
          title: "Website",
          url: "https://sass-lang.com/",
        },
        {
          title: "Docs",
          url: "https://sass-lang.com/documentation",
        },
        {
          title: "Next.js-specific docs",
          url: "https://nextjs.org/docs/basic-features/built-in-css-support#sass-support",
        },
      ],
    },
    {
      name: "Chakra UI",
      filter: Boolean(flags.chakra),
      description: `Chakra UI is a simple, modular, and accessible React component library that provides all the building blocks needed to build React user interfaces. It uses Emotion under the hood and includes components ranging from basic buttons and form input fields to tooltips and modals.`,
      links: [
        {
          title: "Website",
          url: "https://chakra-ui.com/",
        },
        {
          title: "Docs",
          url: "https://chakra-ui.com/docs/getting-started",
        },
        {
          title: "GitHub",
          url: "https://github.com/chakra-ui/chakra-ui",
        },
      ],
    },
    {
      name: "Material UI",
      filter: Boolean(flags["material-ui"]),
      description: `Material UI is a React UI component library that implements Google's material design guidelines. It features pre-built with components ranging from basic buttons and form input fields to tooltips and modals.`,
      links: [
        {
          title: "Website",
          url: "https://material-ui.com/",
        },
        {
          title: "Docs",
          url: "https://material-ui.com/getting-started/installation/",
        },
        {
          title: "GitHub",
          url: "https://github.com/mui-org/material-ui",
        },
      ],
    },
    {
      name: "React Hook Form",
      filter: Boolean(flags["react-hook-form"]),
      description: `React Hook Form is a React library that simplifies the process of implementing forms from state management to input validation and error handling. Unlike previous form libraries, it provides better performance by storing the form state in the dom by default.`,
      links: [
        {
          title: "Website",
          url: "https://react-hook-form.com/",
        },
        {
          title: "Docs",
          url: "https://react-hook-form.com/get-started",
        },
        {
          title: "GitHub",
          url: "https://github.com/react-hook-form/react-hook-form",
        },
      ],
    },
    {
      name: "Formik",
      filter: Boolean(flags.formik),
      description: `Formik is a React library that helps simplify the process of building and working with forms in React. It is designed to take care of the repetitive and tedious parts of form building, validation, and submission, making it easier and faster for developers to create forms.`,
      links: [
        {
          title: "Website",
          url: "https://formik.org/",
        },
        {
          title: "Docs",
          url: "https://formik.org/docs/overview",
        },
        {
          title: "GitHub",
          url: "https://github.com/formium/formik",
        },
      ],
    },
    {
      name: "Framer Motion",
      filter: Boolean(flags["framer-motion"]),
      description: `Framer Motion is a popular React animation library. It allows users to create both simple animations and complex gesture-based interactions. The library implements a declarative API, otherwise known as spring animations, which lets the developer define the animation's end state, letting the library handle the rest.`,
      links: [
        {
          title: "Website",
          url: "https://www.framer.com/motion/",
        },
        {
          title: "Docs",
          url: "https://www.framer.com/docs/",
        },
        {
          title: "GitHub",
          url: "https://github.com/framer/motion",
        },
      ],
    },
    {
      name: "ESLint",
      filter: true,
      description: `ESLint is a tool for linting JavaScript and TypeScript code. It is used to check for errors in code and to enforce coding conventions. It can be configured to use custom rule sets and is often run both by code editors during development as well as in CI/CD.`,
      links: [
        {
          title: "Website",
          url: "https://eslint.org/",
        },
        {
          title: "Configuration",
          url: "https://eslint.org/docs/user-guide/configuring/",
        },
        {
          title: "Rules",
          url: "https://eslint.org/docs/rules/",
        },
        {
          title: "GitHub",
          url: "https://github.com/eslint/eslint",
        },
      ],
    },
    {
      name: "Prettier",
      filter: Boolean(flags.prettier),
      description: `Prettier is a tool for formatting code. It is optimized for readability and consistency, and its opinionated nature ensures developers won't spent time debating code formatting configurations. Prettier normally runs in a pre-commit hook to ensure code is formatted before it is committed.`,
      links: [
        {
          title: "Website",
          url: "https://prettier.io/",
        },
        {
          title: "Docs",
          url: "https://prettier.io/docs/en/index.html",
        },
        {
          title: "Options",
          url: "https://prettier.io/docs/en/options.html",
        },
        {
          title: "GitHub",
          url: "https://github.com/prettier/prettier",
        },
      ],
    },
    {
      name: "Husky",
      filter: setUpLintStagedStep.didRun,
      description: `Husky uses git hooks to let you run code at specific times in your git workflow. It is mainly used to format and lint code in a pre-commit hook to ensure committed code is formatted and free of error.`,
      links: [
        {
          title: "Website",
          url: "https://typicode.github.io/husky/",
        },
        {
          title: "Docs",
          url: "https://typicode.github.io/husky/",
        },
        {
          title: "GitHub",
          url: "https://github.com/typicode/husky",
        },
      ],
    },
    {
      name: "lint-staged",
      filter: setUpLintStagedStep.didRun,
      description: `lint-staged is a tool for running commands on staged files in a git repository. It is mainly used to filter out files that aren't staged during a formatting or linting pre-commit hook.`,
      links: [
        {
          title: "Website",
          url: "https://github.com/okonet/lint-staged",
        },
        {
          title: "GitHub",
          url: "https://github.com/okonet/lint-staged",
        },
      ],
    },
    {
      name: "Yarn",
      filter: flags["package-manager"] === "yarn",
      description: `Yarn is a JavaScript package manager compatible with the npm registry that helps developers automate the process around npm packages such as installing, updating, removing, and more.`,
      links: [
        {
          title: "Website",
          url: "https://yarnpkg.com/",
        },
        {
          title: "CLI Docs",
          url: "https://yarnpkg.com/cli",
        },
        {
          title: "GitHub",
          url: "https://github.com/yarnpkg/berry",
        },
      ],
    },
    {
      name: "npm",
      filter: flags["package-manager"] === "npm",
      description: `npm is the default package manager for Node.js. It consists of a command-line client, also called npm, and an online database of packages, called the npm registry, that enable developers to share and reuse code.`,
      links: [
        {
          title: "Website",
          url: "https://www.npmjs.com/",
        },
        {
          title: "CLI Docs",
          url: "https://docs.npmjs.com/cli/",
        },
      ],
    },
    {
      name: "GitHub Actions",
      filter: Boolean(flags["github-actions"]),
      description: `GitHub Actions is a tool for automating software development workflows. It is integrated with GitHub repositories and enables developers to automate tasks such as building, testing, and deploying their applications.`,
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
  ]

  const filteredTechnologies = technologies
    .filter((technology) => technology.filter)
    .map((technology): Omit<Technology, "filter"> => {
      const { filter: _, ...rest } = technology
      const technologyWithoutFilter: Omit<Technology, "filter"> = {
        ...rest,
      }
      return technologyWithoutFilter
    })

  return endent/* tsx */ `
    export type Technology = {
      name: string;
      description: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    export const technologies: Technology[] = ${JSON.stringify(
      filteredTechnologies,
      null,
      2
    )};
  `
}
