import { Command, flags } from "@oclif/command"
import { updateYarn } from "./steps/update-yarn"

class Boil extends Command {
  static description =
    "Boil is an opinionated interactive command to easily setup the boilerplate of your next frontend."

  static flags = {
    help: flags.help({ char: "h" }),
    version: flags.version({ char: "v" }),
  }

  static args = []

  async run() {
    this.parse(Boil)

    const steps = [updateYarn]

    steps.forEach(async (step) => {
      await step.call(this)
    })
  }
}

export = Boil
