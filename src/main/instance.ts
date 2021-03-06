import Command from "@oclif/command"

type CommandInstance = {
  _instance: Command | null
  set: (instance: Command) => void
  get: () => Command
}

export const commandInstance: CommandInstance = {
  _instance: null,
  set: (instance) => {
    commandInstance._instance = instance
  },
  get: () => {
    if (commandInstance._instance != null) {
      return commandInstance._instance
    } else {
      throw new Error("commandInstance.get() called before it was set.")
    }
  },
}
