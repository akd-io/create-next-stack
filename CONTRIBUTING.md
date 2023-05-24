# Contributing

Hey there! We're excited that you're interested in contributing to Create Next Stack. This document should help you get set up locally and guide you through the process of contributing.

## Table of Contents

- [Getting Started](#getting-started)
- [Repository Overview](#repository-overview)
- [Creating a pull request](#creating-a-pull-request)
- [Adding support for a new technology](#adding-support-for-a-new-technology)
- [Writing a plugin](#writing-a-plugin)

## Getting Started

Before you start contributing, you'll need to get the project set up locally. Follow the steps below to get started.

1. Make sure you have the latest [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed.
2. Install [pnpm](https://pnpm.io/) using `npm i -g pnpm`.
3. Fork the repository on GitHub.
4. Clone your forked repository locally.
5. Install dependencies using `pnpm install`.
6. Build the project using `pnpm run build`.

## Repository Overview

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) managed using [pnpm](https://pnpm.io/). This means that there are multiple packages in the repository, each with their own `package.json` file. The `package.json` file in the root of the repository is used to manage the packages in the repository.

You can see where the monorepo looks for packages in the `pnpm-workspace.yaml` file:

```yaml
packages:
  - "packages/**"
  - "website"
```

Packages that are published to npm are located inside the [`packages`](packages) directory. A single [`website`](website) package is located outside of the `packages` directory, as it is not published to npm. The `website` package is used to build the [create-next-stack.com](https://create-next-stack.com/).

You can find a list of generally useful npm scripts available in the root by checking out the root [`package.json`](package.json) file.

A couple of notable scripts that allow you to build, lint, and test the entire repository, or specific packages are:

- `build`
- `build:cli`
- `build:web`
- `lint`
- `lint:cli`
- `lint:web`
- `test`
- `test:cli`
- `test:web`

Each package has its own `package.json` file, which contains scripts specific to that package. The above list are just wrapper scripts that call the underlying packages' `build`, `test`, and `test` scripts.

Note that running scripts inside a specific package's directory will only run the script for that package. For example, running `pnpm run build` inside the `packages/create-next-stack` directory will run the `build` script specified in the `create-next-stack` package's `package.json` file.

## Creating a Pull Request

Make sure you are set up locally by following the [Getting Started](#getting-started) section above.

1. Create a new branch from `develop` with a descriptive name.
2. Make your changes.
3. Run tests using `pnpm test` to ensure they all pass.
4. [Submit a Pull Request](https://github.com/akd-io/create-next-stack/compare).

## Adding Support for a New Technology

Make sure you are set up locally by following the [Getting Started](#getting-started) section above.

1. Create a new branch from `develop` with a descriptive name.

   - `git checkout -b feature/support-my-favorite-technology`

2. Useful npm scripts of `packages/create-next-stack` to run during development:

   - `check-types:watch` - Runs TypeScript in watch mode to check types as you make changes. You can run this instead of `build:watch` while working on the CLI, as the e2e tests do just-in-time compilation via `ts-node`.
   - `jest:watch` - Runs Jest in watch mode to run unit tests as you make changes.
     - These tests were specifically made to ease the plugin authoring process, so don't forget this one.
   - `test` - Runs e2e tests. Note that this will run all e2e tests, which can take quite a while.
   - `lint` - Runs ESLint to lint the project.
   - `test:manual`
     - For example, `pnpm run test:manual --package-manager=pnpm --styling=emotion`.
     - Sets up a new directory for a test run of the CLI, runs the CLI with the specified flags, and builds the generated Next app, and checks formatting and linting.
     - This is useful for manually testing the CLI. Pass whatever flags to the CLI that you want to test. The `app_name` argument will be set automatically.
   - `test:raw` - Runs the binary directly. Rarely used, but can be useful for manual tests where you want to be able to specify the `app_name` argument yourself.
   - `clean` - Removes all generated files, including build files and the `create-next-stack-tests` directory created by the e2e tests.

3. Add a new .ts file for your plugin in the plugins directory at `packages\create-next-stack\src\main\plugins`

   - See the [Writing a plugin section](#writing-a-plugin) below to learn how to write a Create Next Stack plugin.

4. Add new flags to the `create-next-stack` command in [`create-next-stack.ts`](packages\create-next-stack\src\main\commands\create-next-stack.ts).
5. Add the plugin to the `plugins` array in [`setup.ts`](packages/create-next-stack/src/main/setup/setup.ts).
6. Add potential plugin steps to the `steps` array in [`setup.ts`](packages/create-next-stack/src/main/setup/setup.ts). Steps are run top-to-bottom.
7. Update the [`README.md`](README.md):
   - Add the technology to the technology list
   - Update the `Usage` section by copy pasting the output of running `yarn print:help`
8. Consider expanding some of the e2e tests to include the new technology. See [`test.ts`](packages\create-next-stack\src\tests\e2e\test.ts) for current tests.
9. Run tests using `yarn test` to ensure they all pass.
10. Submit a Pull Request on GitHub.

## Writing a Plugin

Plugins aren't too scary. A Create Next Stack plugin consists of a simple TypeScript file that calls a `createPlugin()` function with JSON object.

See the [Framer Motion plugin](packages/create-next-stack/src/main/plugins/emotion.ts) for example. This plugin adds the `framer-motion` npm dependency to the generated Next.js project, as well as adding some documentation about the technology.

```typescript
export const framerMotionPlugin = createPlugin({
  id: "framer-motion",
  name: "Framer Motion",
  description: "Adds support for Framer Motion",
  active: ({ flags }) => Boolean(flags["framer-motion"]),
  dependencies: {
    "framer-motion": {
      name: "framer-motion",
      version: "^9.0.0",
    },
  },
  technologies: [
    {
      id: "framerMotion",
      name: "Framer Motion",
      description:
        "Framer Motion is a popular React animation library. It allows users to create both simple animations and complex gesture-based interactions. The library implements a declarative API, otherwise known as spring animations, which lets the developer define the animation's end state, letting the library handle the rest.",
      links: [
        { title: "Website", url: "https://www.framer.com/motion/" },
        { title: "Docs", url: "https://www.framer.com/docs/" },
        { title: "GitHub", url: "https://github.com/framer/motion" },
      ],
    },
  ],
} as const)
```

Below is a breakdown of the `createPlugin()` function's JSON object:

- The `name` property is the name of the plugin.
- The `description` property is a short description of the plugin.
- The `active` property is a function that returns a boolean indicating whether the plugin should be active. This function is passed the `flags` object, which contains all the flags passed to the `create-next-stack` command.
- The `dependencies` property is an object containing the npm dependencies that should be added to the generated Next.js project. The key and `name` property is the name of the dependency, and the `version` property is version of the dependency.
- The `technologies` property is an array of objects containing information about the technology. The `name` property is the name of the technology. The `description` property is a short description of the technology. The `links` property is an array of objects containing links to the technology's website, documentation, and GitHub repository.

Some of these properties are optional, and some are required. Some properties are used by the CLI, some are used by the website, and some both. It's not too important to know everywhere these properties are used. As long as we specify as many properties as possible, the CLI and website is going to find out how to use it.

For a complete list of properties that can be passed to the `createPlugin()` function, their explanations, and usage, see the [`Plugin` type definition](packages/create-next-stack/src/main/plugin.ts). You should find all the documentation you need there. If not, please [open an issue](https://github.com/akd-io/create-next-stack/issues/new).

For more examples, please take a look at the [existing plugins](packages/create-next-stack/src/main/plugins).
