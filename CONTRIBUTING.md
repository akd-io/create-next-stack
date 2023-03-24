# Contributing

## Adding support for a new technology

1. Fork the repository on GitHub
2. Create a named feature branch (like `support_x`)
3. Add a new .ts file for your plugin in `src/main/plugins`.

   - See the [Writing a plugin section](#writing-a-plugin) below to learn how to write a Create Next Stack plugin.

4. Add new flags to the CLI in [`src/main/index.ts`](src/main/index.ts)
5. Add the plugin to the `plugins` array in [`src/main/setup/setup.ts`](src/main/setup/setup.ts).
6. Add potential plugin steps to the `steps` array in [`src/main/setup/setup.ts`](src/main/setup/setup.ts). Steps are run top-to-bottom.
7. Update the `README.md`:
   - Add the technology to the technology list
   - Update the `Usage` section to include the new technology
8. Consider expanding some of the e2e tests to include the new technology.
9. Run tests using `yarn test` to ensure they all pass
10. Submit a Pull Request on GitHub

## Writing a plugin

Plugins aren't too scary. The simple Framer Motion plugin that simply adds the `framer-motion` dependency looks like this:

```typescript
export const framerMotionPlugin = createPlugin({
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

and the [Emotion plugin](src/main/plugins/emotion.ts) easily sets Next.js compiler options using

```typescript
compilerOptions: {
  emotion: true,
}
```

and the [Prettier plugin](src/main/plugins/prettier.ts) easily adds formatting scripts to the `package.json` file using

```typescript
scripts: [
  {
    name: "format",
    description: "Formats all source code in the project.",
    command: "prettier --write --ignore-path=.gitignore .",
  },
  {
    name: "format:check",
    description: "Checks the formatting of all code in the project.",
    command: "prettier --check --ignore-path=.gitignore .",
  },
],
```

Take a look at the `Plugin` type for documentation on each available property in [`src/main/plugin.ts`](src/main/plugin.ts).

Also take a look at the [other plugins](src/main/plugins) for more advanced examples.
