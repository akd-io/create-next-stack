<img width="100%" src="assets/banner.png" alt="A screenshot of the Create Next Stack website">

<p align="center">
  <a aria-label="Build status" href="https://github.com/akd-io/create-next-stack-website/actions/workflows/main.yml?query=branch%3Adevelop">
    <img alt="" src="https://img.shields.io/github/workflow/status/akd-io/create-next-stack-website/CI/develop?style=flat-square">
  </a>
  <a aria-label="Last commit" href="https://github.com/akd-io/create-next-stack-website/commits/develop">
    <img alt="" src="https://img.shields.io/github/last-commit/akd-io/create-next-stack-website/develop?style=flat-square">
  </a>
  <a aria-label="License" href="https://github.com/akd-io/create-next-stack-website/blob/develop/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/create-next-stack-website?color=44cc11&style=flat-square">
  </a>
  <a aria-label="Create Next Stack CLI GitHub Repository" href="https://github.com/akd-io/create-next-stack">
    <img alt="" src="https://img.shields.io/badge/CLI-gray?style=flat-square&logo=github">
  </a>
  <a aria-label="Community Discord" href="https://discord.gg/7Ns5WwGjjZ">
    <img alt="" src="https://img.shields.io/badge/Discord-gray?style=flat-square&logo=discord">
  </a>
  <a aria-label="Twitter profile of the creator of Create Next Stack" href="https://twitter.com/akd_io">
    <img alt="" src="https://img.shields.io/badge/Twitter-gray?style=flat-square&logo=twitter">
  </a>
</p>

# Create Next Stack Website

Welcome to the repository of the [create-next-stack.com](https://www.create-next-stack.com/) website.

This project acts as the UI for the create-next-stack CLI. All issues not specific to the website should be posted to the [create-next-stack repository](https://github.com/akd-io/create-next-stack) instead.

## Contributing

If you've found a bug or has an idea for an improvement, please [create a new issue](https://github.com/akd-io/create-next-stack-website/issues/new) or fork the project and submit a pull request.

### Getting started

To get started, run:

```bash
yarn dev
```

## Scripts

The table below provides names and descriptions of the npm scripts available in this project.

Each script is run using `yarn <script-name>`. For example: `yarn dev`.

| Name           | Description                                                                                                                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`          | Runs the Next.js development server.                                                                                                                                                                                 |
| `build`        | Generates a production build.                                                                                                                                                                                        |
| `start`        | Runs the Next.js production server built using `build` script.                                                                                                                                                       |
| `lint`         | Runs [ESLint](https://eslint.org/) to catch linting errors in the source code.                                                                                                                                       |
| `format`       | Formats all source code in the project.                                                                                                                                                                              |
| `format:check` | Checks the formatting of all code in the project.                                                                                                                                                                    |
| `prepare`      | The [`prepare` life cycle script](https://docs.npmjs.com/cli/v7/using-npm/scripts#life-cycle-scripts) is used to set up Git pre-commit hooks when people run `yarn install`. This script should not be run manually. |

## Technologies

The table below gives an overview of the technologies used in this project, as well as places to learn more about them.

| Name                                                  | Links                                                                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Next.js](https://nextjs.org/)                        | [Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)                               |
| [React](https://reactjs.org/)                         | [Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)                                                     |
| [TypeScript](https://www.typescriptlang.org/)         | [Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)                                                        |
| [Emotion](https://emotion.sh/docs/introduction)       | [Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)                                                          |
| [Chakra UI](https://chakra-ui.com/)                   | [Docs](https://chakra-ui.com/docs/getting-started) - [GitHub repo](https://github.com/chakra-ui/chakra-ui)                                                   |
| [React Hook Form](https://react-hook-form.com/)       | [Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)                                          |
| [Framer Motion](https://www.framer.com/motion/)       | [Docs](https://www.framer.com/docs/) - [GitHub repo](https://github.com/framer/motion)                                                                       |
| [ESLint](https://eslint.org/)                         | [Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint) |
| [Prettier](https://prettier.io/)                      | [Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)   |
| [Husky](https://typicode.github.io/husky/)            | [Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)                                                                 |
| [lint-staged](https://github.com/okonet/lint-staged)  | [GitHub repo](https://github.com/okonet/lint-staged)                                                                                                         |
| [Yarn](https://yarnpkg.com/)                          | [CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)                                                                        |
| [GitHub Actions](https://github.com/features/actions) | [Docs](https://docs.github.com/en/actions) - [Workflow syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)              |
