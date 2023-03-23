# Contributing

## Adding support for a new technology

1. Fork the repository on GitHub
2. Create a named feature branch (like `support_x`)
3. Add your plugin new .ts file in `src/main/plugins`. Look at the other files for examples
4. Add new flags to the CLI in `src/main/index.ts`
5. Add the plugin to the `plugins` array in `src/main/setup/setup.ts`.
6. Add potential plugin steps to the `steps` array in `src/main/setup/setup.ts`. Steps are run top-to-bottom.
7. Update the `README.md`:
   - Add the technology to the technology list
   - Update the `Usage` section to include the new technology
8. Consider expanding some of the e2e tests to include the new technology.
9. Run tests using `yarn test` to ensure they all pass
10. Submit a Pull Request on GitHub
