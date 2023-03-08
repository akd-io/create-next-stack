import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const testScriptPlugin = constrain<Plugin>()({
  name: "Test script",
  description: "Adds a test script to package.json",
  scripts: [
    {
      // TODO: Make this plugin only add a test script if a testing framework has been selected. Currently added so the github-actions workflow won't fail when calling the `test` npm script.
      name: "test",
      description: "Runs tests",
      command: "echo No tests found.",
    },
  ],
} as const)
