import { Flex, FlexProps } from "@mantine/core"
import { FC } from "react"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

export const SocialIcons: FC<FlexProps> = (props) => {
  return (
    <Flex
      justify={{ base: "left", sm: "center" }}
      align="center"
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
