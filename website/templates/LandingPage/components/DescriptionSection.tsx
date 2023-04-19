import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Stack, Text } from "@chakra-ui/react"
import React from "react"
import { Anchor } from "../../../components/Anchor"

export const Description = () => {
  return (
    <Stack maxWidth="600" spacing="4">
      <Text>
        <b>Create Next Stack</b> is a website and CLI tool used to easily set up
        the boilerplate of new{" "}
        <Anchor href="https://nextjs.org" isExternal>
          Next.js <ExternalLinkIcon mx="2px" />
        </Anchor>{" "}
        apps.
      </Text>
      <Text>
        Where{" "}
        <Anchor
          href="https://nextjs.org/docs/api-reference/create-next-app"
          isExternal
        >
          Create Next App <ExternalLinkIcon mx="2px" />
        </Anchor>{" "}
        lets you choose a single template only, Create Next Stack lets you pick
        and choose an array of technologies often used alongside Next.js,
        freeing you of the pain of making them work together.
      </Text>
    </Stack>
  )
}
