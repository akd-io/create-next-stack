import * as execa from "execa"
import Boil = require("..")

export async function updateYarn(this: Boil) {
  this.log("Updating Yarn...")

  try {
    await execa("npm i -g yarn")
  } catch (error) {
    this.error("An error occurred while updating Yarn.", {
      exit: 1,
    })
  }
}
