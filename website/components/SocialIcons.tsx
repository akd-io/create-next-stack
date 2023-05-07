import { Flex, Stack } from "@chakra-ui/react"
import React, { ComponentProps } from "react"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

export const SocialIcons: React.FC<ComponentProps<typeof Flex>> = (props) => {
  return (
    <Flex
      justifyContent={["left", "center"]}
      alignItems="center"
      gap="12px"
      {...props}
    >
      <a
        aria-label="GitHub Repository of Create Next Stack"
        href="https://github.com/akd-io/create-next-stack"
      >
        <FaGithub size="24px" />
      </a>
      <a aria-label="Community Discord" href="https://discord.gg/7Ns5WwGjjZ">
        <FaDiscord size="24px" />
      </a>
      <a
        aria-label="Twitter profile of the creator of Create Next Stack"
        href="https://twitter.com/akd_io"
      >
        <FaTwitter size="24px" />
      </a>
    </Flex>
  )
}
