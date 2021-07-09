# Create Next Stack ![npm](https://img.shields.io/npm/v/create-next-stack?style=flat-square) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/akd-io/create-next-stack/CI/develop?style=flat-square) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/akd-io/create-next-stack/develop?style=flat-square) ![NPM](https://img.shields.io/npm/l/create-next-stack?color=44cc11&style=flat-square)

Create Next Stack is an opinionated interactive CLI tool to easily set up the boilerplate of a new [Next.js](https://github.com/vercel/next.js) app.

Where [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) lets you choose a single template only, Create Next Stack lets you pick and choose an array of technologies often used alongside Next.js, and free you of the pain of making them work together.

To get started, run:

```bash
npx create-next-stack
```

## Supported technologies

The table below shows the technologies currently supported by Create Next Stack.

| Name                                                 | Mandatory | Links                                                                                                                                                        |
| ---------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Next.js](https://nextjs.org/)                       | Yes       | [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)                               |
| [React](https://reactjs.org/)                        | Yes       | [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)                                                     |
| [TypeScript](https://www.typescriptlang.org/)        | Yes       | [Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)                                                        |
| [ESLint](https://eslint.org/)                        | Yes       | [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint) |
| [Yarn](https://yarnpkg.com/)                         | Yes       | [CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)                                                                        |
| [Emotion](https://emotion.sh/docs/introduction)      | No        | [Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)                                                          |
| [React Hook Form](https://react-hook-form.com/)      | No        | [Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)                                          |
| [Formik](https://formik.org/)                        | No        | [Docs](https://formik.org/docs/overview) - [GitHub repo](https://github.com/formium/formik)                                                                  |
| [Prettier](https://prettier.io/)                     | No        | [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)   |
| [Husky](https://typicode.github.io/husky/)           | No        | [Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)                                                                 |
| [lint-staged](https://github.com/okonet/lint-staged) | No        | [GitHub repo](https://github.com/okonet/lint-staged)                                                                                                         |

## CLI Options

Below you see an overview of Create Next Stack's CLI options. The overview is the result of running `create-next-stack --help`

```
USAGE
  $ create-next-stack

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version
  --debug        show verbose error messages for debugging purposes
```

## License

Create Next Stack is released under the [MIT License](LICENSE).
