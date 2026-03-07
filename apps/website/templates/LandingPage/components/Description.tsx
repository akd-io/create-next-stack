import { Flex, Text } from "@mantine/core"
import { Anchor } from "../../../components/Anchor"

export const Description = () => {
  return (
    <Flex direction="column" maw="600" gap="16">
      <Text>
        <b>Create Next Stack</b> is a website and CLI tool used to easily set up
        the boilerplate of new{" "}
        <Anchor href="https://nextjs.org" target="_blank">
          Next.js
        </Anchor>{" "}
        apps.
      </Text>
      <Text>
        Where{" "}
        <Anchor
          href="https://nextjs.org/docs/api-reference/create-next-app"
          target="_blank"
        >
          Create Next App
        </Anchor>{" "}
        lets you choose a single template only, Create Next Stack lets you pick
        and choose an array of technologies often used alongside Next.js,
        freeing you of the pain of making them work together.
      </Text>
    </Flex>
  )
}
