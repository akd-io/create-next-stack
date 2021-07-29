<img width="100%" src="assets/banner.png" alt="Create Next Stack - The ultimate starter kit for Next.js">

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/create-next-stack">
    <img alt="" src="https://img.shields.io/npm/v/create-next-stack?style=flat-square">
  </a>
  <a aria-label="Build status" href="https://github.com/akd-io/create-next-stack/actions/workflows/main.yml?query=branch%3Adevelop">
    <img alt="" src="https://img.shields.io/github/workflow/status/akd-io/create-next-stack/CI/develop?style=flat-square">
  </a>
  <a aria-label="Last commit" href="https://github.com/akd-io/create-next-stack/commits/develop">
    <img alt="" src="https://img.shields.io/github/last-commit/akd-io/create-next-stack/develop?style=flat-square">
  </a>
  <a aria-label="License" href="https://github.com/akd-io/create-next-stack/blob/develop/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/create-next-stack?color=44cc11&style=flat-square">
  </a>
</p>

Create Next Stack is an opinionated interactive CLI tool to easily set up the boilerplate of a new [Next.js](https://github.com/vercel/next.js) app.

Where [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) lets you choose a single template only, Create Next Stack lets you pick and choose an array of technologies often used alongside Next.js, and free you of the pain of making them work together.

To get started, run:

```bash
npx create-next-stack
```

Then, pick a project name, and your preferred technologies like so:

<p align="center">
  <img width="600" alt="Screenshot of Create Next Stack running in a terminal" src="assets/screenshot.png">
</p>

## Supported technologies

The table below provides an overview of the technologies currently supported by Create Next Stack.

### Icons

A few icons are used to label different properties of these technologies. We describe these here:

#### <img width="14" alt="" src="assets/required-icon.png"> Required icon:

Technologies marked required are, you guessed it, required. If you don't want to use these technologies, you have three options:

1. Set up your project using Create Next Stack anyway, and make the necessary adjustments manually.
1. Set up your project manually with Create Next App.
1. Find and use a template repo you can clone here on GitHub.

#### <img width="14" alt="" src="assets/convenience-icon.png"> Convenience install icon:

Technologies marked as _convenience installs_ are technologies that work out of the box with Next.js, and which Create Next Stack is making available for convenience only. If you are on the fence about a specific technology marked with the icon, you can safely skip it and install it in the future without worrying about complicated setup steps.

### Technologies table

| Name                                                                                                                              | Links                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/) <img width="14" alt="required icon" src="assets/required-icon.png">                                | [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)                                       |
| [React](https://reactjs.org/) <img width="14" alt="required icon" src="assets/required-icon.png">                                 | [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)                                                             |
| [TypeScript](https://www.typescriptlang.org/) <img width="14" alt="required icon" src="assets/required-icon.png">                 | [Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)                                                                |
| [ESLint](https://eslint.org/) <img width="14" alt="required icon" src="assets/required-icon.png">                                 | [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint)         |
| [Yarn](https://yarnpkg.com/)                                                                                                      | [CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)                                                                                |
| [npm](https://www.npmjs.com/)                                                                                                     | [CLI Docs](https://docs.npmjs.com/cli/)                                                                                                                              |
| [Emotion](https://emotion.sh/docs/introduction)                                                                                   | [Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)                                                                  |
| [styled-components](https://styled-components.com/)                                                                               | [Docs](https://styled-components.com/docs) - [GitHub repo](https://github.com/styled-components/styled-components)                                                   |
| [CSS Modules](https://github.com/css-modules/css-modules)                                                                         | [Docs](https://github.com/css-modules/css-modules) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) |
| [Sass](https://sass-lang.com/) <img width="14" alt="convenience install icon" src="assets/convenience-icon.png">                  | [Docs](https://sass-lang.com/documentation) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)                      |
| [React Hook Form](https://react-hook-form.com/) <img width="14" alt="convenience install icon" src="assets/convenience-icon.png"> | [Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)                                                  |
| [Formik](https://formik.org/) <img width="14" alt="convenience install icon" src="assets/convenience-icon.png">                   | [Docs](https://formik.org/docs/overview) - [GitHub repo](https://github.com/formium/formik)                                                                          |
| [Framer Motion](https://www.framer.com/motion/) <img width="14" alt="convenience install icon" src="assets/convenience-icon.png"> | [Docs](https://www.framer.com/docs/) - [GitHub repo](https://github.com/framer/motion)                                                                               |
| [Prettier](https://prettier.io/)                                                                                                  | [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)           |
| [Husky](https://typicode.github.io/husky/)                                                                                        | [Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)                                                                         |
| [lint-staged](https://github.com/okonet/lint-staged)                                                                              | [GitHub repo](https://github.com/okonet/lint-staged)                                                                                                                 |

## Usage

Below you see an overview of Create Next Stack's usage, including detailed information about arguments and options. The overview is the result of running `create-next-stack --help`

```
USAGE
  $ create-next-stack [APPNAME]

ARGUMENTS
  APPNAME  The name of your app, optionally including a path prefix. Eg.: "my-app" or "path/to/my-app"

OPTIONS
  -h, --help                                         Shows the CLI help information.
  -v, --version                                      Shows the CLI version information.
  --debug                                            Show verbose error messages for debugging purposes.
  --formatting-pre-commit-hook                       Adds a formatting pre-commit hook.
  --formik                                           Adds Formik. (Form library)
  --framer-motion                                    Adds Framer Motion. (Animation library)
  --package-manager=(yarn|npm)                       Sets the preferred package manager.
  --prettier                                         Adds Prettier. (Code formatting)
  --react-hook-form                                  Adds React Hook Form. (Form library)
  --styling=(emotion|styled-components|css-modules)  Sets the preferred styling method.
```

## License

Create Next Stack is released under the [MIT License](LICENSE).
