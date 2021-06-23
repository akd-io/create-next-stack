import { Command, flags } from "@oclif/command"

class Boil extends Command {
  static description = "Boil is an opinionated interactive command to easily setup the boilerplate of your next frontend."

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
  }

  static args = []

  async run() {
    this.parse(Boil)

    this.log(`Hello from Boil!`)
  }
}

export = Boil
