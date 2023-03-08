import { ValidCNSInputs } from "../../../create-next-stack-types"
import { lintStagedPlugin } from "../../lint-staged"

export const generateTechnologyTableRows = async (
  inputs: ValidCNSInputs
): Promise<string> => {
  const { flags } = inputs

  type TechnologyTableRow = {
    name: string
    links: string
    filter: boolean
  }

  const technologies: TechnologyTableRow[] = [
    {
      name: /* md */ `[Next.js](https://nextjs.org/)`,
      links: /* md */ `[Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)`,
      filter: true,
    },
    {
      name: /* md */ `[React](https://reactjs.org/)`,
      links: /* md */ `[Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)`,
      filter: true,
    },
    {
      name: /* md */ `[TypeScript](https://www.typescriptlang.org/)`,
      links: /* md */ `[Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)`,
      filter: true,
    },
    {
      name: /* md */ `[Emotion](https://emotion.sh/docs/introduction)`,
      links: /* md */ `[Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)`,
      filter: flags.styling === "emotion",
    },
    {
      name: /* md */ `[Styled Components](https://styled-components.com/)`,
      links: /* md */ `[Docs](https://styled-components.com/docs) - [GitHub repo](https://github.com/styled-components/styled-components)`,
      filter: flags.styling === "styled-components",
    },
    {
      name: /* md */ `[Tailwind CSS](https://tailwindcss.com/)`,
      links: /* md */ `[Docs](https://tailwindcss.com/docs) - [GitHub repo](https://github.com/tailwindlabs/tailwindcss)`,
      filter: flags.styling === "tailwind-css",
    },
    {
      name: /* md */ `[CSS Modules](https://github.com/css-modules/css-modules)`,
      links: /* md */ `[Docs](https://github.com/css-modules/css-modules) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)`,
      filter:
        flags.styling === "css-modules" ||
        flags.styling === "css-modules-with-sass",
    },
    {
      name: /* md */ `[Sass](https://sass-lang.com/)`,
      links: /* md */ `[Docs](https://sass-lang.com/documentation) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)`,
      filter: flags.styling === "css-modules-with-sass",
    },
    {
      name: /* md */ `[Chakra UI](https://chakra-ui.com/)`,
      links: /* md */ `[Docs](https://chakra-ui.com/docs/getting-started) - [GitHub repo](https://github.com/chakra-ui/chakra-ui)`,
      filter: Boolean(flags.chakra),
    },
    {
      name: /* md */ `[Material UI](https://material-ui.com/)`,
      links: /* md */ `[Docs](https://material-ui.com/getting-started/installation/) - [GitHub repo](https://github.com/mui-org/material-ui)`,
      filter: Boolean(flags["material-ui"]),
    },
    {
      name: /* md */ `[React Hook Form](https://react-hook-form.com/)`,
      links: /* md */ `[Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)`,
      filter: Boolean(flags["react-hook-form"]),
    },
    {
      name: /* md */ `[Formik](https://formik.org/)`,
      links: /* md */ `[Docs](https://formik.org/docs/overview) - [GitHub repo](https://github.com/formium/formik)`,
      filter: Boolean(flags.formik),
    },
    {
      name: /* md */ `[Framer Motion](https://www.framer.com/motion/)`,
      links: /* md */ `[Docs](https://www.framer.com/docs/) - [GitHub repo](https://github.com/framer/motion)`,
      filter: Boolean(flags["framer-motion"]),
    },
    {
      name: /* md */ `[ESLint](https://eslint.org/)`,
      links: /* md */ `[Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint)`,
      filter: true,
    },
    {
      name: /* md */ `[Prettier](https://prettier.io/)`,
      links: /* md */ `[Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)`,
      filter: Boolean(flags.prettier),
    },
    {
      name: /* md */ `[Husky](https://typicode.github.io/husky/)`,
      links: /* md */ `[Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)`,
      filter: await lintStagedPlugin.steps.setup.shouldRun(inputs),
    },
    {
      name: /* md */ `[lint-staged](https://github.com/okonet/lint-staged)`,
      links: /* md */ `[GitHub repo](https://github.com/okonet/lint-staged)`,
      filter: await lintStagedPlugin.steps.setup.shouldRun(inputs),
    },
    {
      name: /* md */ `[Yarn](https://yarnpkg.com/)`,
      links: /* md */ `[CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)`,
      filter: flags["package-manager"] === "yarn",
    },
    {
      name: /* md */ `[npm](https://www.npmjs.com/)`,
      links: /* md */ `[CLI Docs](https://docs.npmjs.com/cli/)`,
      filter: flags["package-manager"] === "npm",
    },
    {
      name: /* md */ `[GitHub Actions](https://github.com/features/actions)`,
      links: /* md */ `[Docs](https://docs.github.com/en/actions) - [Workflow syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)`,
      filter: Boolean(flags["github-actions"]),
    },
  ]

  const technologyRowsString = technologies
    .filter((technology) => technology.filter)
    .map((technology) => /* md */ `|${technology.name}|${technology.links}|`)
    .join("\n")

  return technologyRowsString
}
