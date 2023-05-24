# Create Next Stack

<p>
  <a aria-label="Last commit" href="https://github.com/akd-io/create-next-stack/commits/develop">
    <img alt="" src="https://img.shields.io/github/last-commit/akd-io/create-next-stack/develop?style=flat-square">
  </a>
  <a aria-label="License" href="https://github.com/akd-io/create-next-stack/blob/develop/packages/create-next-stack/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/create-next-stack?color=44cc11&style=flat-square">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/create-next-stack">
    <img alt="" src="https://img.shields.io/npm/v/create-next-stack?style=flat-square">
  </a>
  <a aria-label="Community Discord" href="https://discord.gg/7Ns5WwGjjZ">
    <img alt="" src="https://img.shields.io/badge/Discord-gray?style=flat-square&logo=discord">
  </a>
  <a aria-label="Twitter profile of the creator of Create Next Stack" href="https://twitter.com/akd_io">
    <img alt="" src="https://img.shields.io/badge/Twitter-gray?style=flat-square&logo=twitter">
  </a>
  <a aria-label="GitHub Repo stars" href="https://github.com/akd-io/create-next-stack">
    <img alt="" src="https://img.shields.io/github/stars/akd-io/create-next-stack?style=social">
  </a>
</p>

[Create Next Stack](https://www.create-next-stack.com/) is a website and CLI tool used to easily set up the boilerplate of new [Next.js](https://github.com/vercel/next.js) apps.

Where [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) lets you choose a single template only, Create Next Stack lets you pick and choose an array of technologies often used alongside Next.js, and free you of the pain of making them work together.

To get started, go to [create-next-stack.com](https://www.create-next-stack.com).

## Supported technologies

The table below provides an overview of the technologies currently supported by Create Next Stack.

| Name                                                      | Links                                                                                                                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/) (Mandatory)                | [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)                                       |
| [React](https://reactjs.org/) (Mandatory)                 | [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)                                                             |
| [TypeScript](https://www.typescriptlang.org/) (Mandatory) | [Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)                                                                |
| [ESLint](https://eslint.org/) (Mandatory)                 | [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint)         |
| [pnpm](https://pnpm.io/)                                  | [Docs](https://pnpm.io/motivation) - [GitHub repo](https://github.com/pnpm/pnpm)                                                                                     |
| [Yarn](https://yarnpkg.com/)                              | [CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)                                                                                |
| [npm](https://www.npmjs.com/)                             | [CLI Docs](https://docs.npmjs.com/cli/)                                                                                                                              |
| [Emotion](https://emotion.sh/docs/introduction)           | [Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)                                                                  |
| [Styled Components](https://styled-components.com/)       | [Docs](https://styled-components.com/docs) - [GitHub repo](https://github.com/styled-components/styled-components)                                                   |
| [Tailwind CSS](https://tailwindcss.com/)                  | [Docs](https://tailwindcss.com/docs) - [GitHub repo](https://github.com/tailwindlabs/tailwindcss)                                                                    |
| [CSS Modules](https://github.com/css-modules/css-modules) | [Docs](https://github.com/css-modules/css-modules) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) |
| [Sass](https://sass-lang.com/)                            | [Docs](https://sass-lang.com/documentation) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)                      |
| [Chakra UI](https://chakra-ui.com/)                       | [Docs](https://chakra-ui.com/docs/getting-started) - [GitHub repo](https://github.com/chakra-ui/chakra-ui)                                                           |
| [Material UI](https://material-ui.com/)                   | [Docs](https://material-ui.com/getting-started/installation/) - [GitHub repo](https://github.com/mui-org/material-ui)                                                |
| [React Hook Form](https://react-hook-form.com/)           | [Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)                                                  |
| [Formik](https://formik.org/)                             | [Docs](https://formik.org/docs/overview) - [GitHub repo](https://github.com/formium/formik)                                                                          |
| [Framer Motion](https://www.framer.com/motion/)           | [Docs](https://www.framer.com/docs/) - [GitHub repo](https://github.com/framer/motion)                                                                               |
| [Prettier](https://prettier.io/)                          | [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)           |
| [Husky](https://typicode.github.io/husky/)                | [Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)                                                                         |
| [lint-staged](https://github.com/okonet/lint-staged)      | [GitHub repo](https://github.com/okonet/lint-staged)                                                                                                                 |
| [GitHub Actions](https://github.com/features/actions)     | [Docs](https://docs.github.com/en/actions) - [Workflow syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)                      |
| [React Icons](https://react-icons.github.io/react-icons/) | [GitHub repo](https://github.com/react-icons/react-icons)                                                                                                            |

## Usage

Below you see an overview of Create Next Stack's usage, including detailed information about arguments and options. The overview is the result of running `create-next-stack --help`

```
USAGE
  $ create-next-stack [APP_NAME] [FLAGS]

ARGUMENTS
  APP_NAME  The name of your app, optionally including a path prefix. Eg.: "my-app" or "path/to/my-app"

FLAGS
  -h, --help                    Shows the CLI help information.
  -v, --version                 Shows the CLI version information.
  --chakra                      Adds Chakra UI. (Component library) (Requires Emotion and Framer Motion)
  --debug                       Show verbose error messages for debugging purposes.
  --formatting-pre-commit-hook  Adds a formatting pre-commit hook. (Requires Prettier)
  --formik                      Adds Formik. (Form library)
  --framer-motion               Adds Framer Motion. (Animation library)
  --github-actions              Adds a GitHub Actions continuous integration workflow.
  --material-ui                 Adds Material UI. (Component library)
  --package-manager=<option>    Sets the preferred package manager. (Required)
                                <options: pnpm|yarn|npm>
  --prettier                    Adds Prettier. (Code formatting)
  --react-hook-form             Adds React Hook Form. (Form library)
  --react-icons                 Adds React Icons. (Icon library)
  --styling=<styling-method>    Sets the preferred styling method. (Required) <styling-method> = emotion|styled-components|tailwind-css|css-modules|css-modules-with-sass
```

## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

Create Next Stack is released under the [MIT License](LICENSE).
