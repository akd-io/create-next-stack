import { testDefaultOptions } from "./tests/default-options"
;(async () => {
  try {
    await testDefaultOptions()
  } catch (error) {
    process.exit(1)
  }
})()
